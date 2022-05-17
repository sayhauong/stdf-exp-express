import CacheBuffer, { BYTE_ORDER_AUTO, BYTE_ORDER_BE, BYTE_ORDER_LE } from "./lib/cache-buffer"
import * as Record from  "./lib/record-define"
import { makeRecord } from "./lib/record-define/helper"

export * as Record from "./lib/record-define"

export interface STDFAnalyserOptions {
    bufferSize?: number,
    byteOrder?: number,
    included?: string[],
    excluded?: string[],
    allCallback?: boolean
}

export type STDFAnalyserCallback = (record: Record.RecordBase) => void
export type STDFAnalyserSyncCallback = (record: Record.RecordBase) => Promise<void>

const defaultAnalyserOptions: STDFAnalyserOptions = {
    bufferSize: 64 * 1024,
    byteOrder: BYTE_ORDER_AUTO,
    allCallback: false
}

export class STDFAnalyser {

    opts: STDFAnalyserOptions = defaultAnalyserOptions

    checkByteOrder: boolean = false
    buffer: CacheBuffer
    size: number = 0

    constructor(opts?: STDFAnalyserOptions) {
        this.opts = {
            ...defaultAnalyserOptions,
            ...opts
        }
        // if (opts) {
        //     this.opts.bufferSize = opts.bufferSize || this.opts.bufferSize
        //     this.opts.byteOrder = opts.byteOrder || this.opts.byteOrder
        //     this.opts.allCallback = opts.allCallback || this.opts.allCallback
        //     this.opts.included = opts.included
        //     this.opts.excluded = opts.excluded
        // }

        this.buffer = new CacheBuffer({
            bufferSize: this.opts.bufferSize, // || 64 * 1024,
            byteOrder: this.opts.byteOrder, // || BYTE_ORDER_AUTO           
        });
    }

    public updateIncluded(included: string[]) {
        this.opts.included = included;
    }

    public updateExcluded(excluded: string[]) {
        this.opts.excluded = excluded;
    }
    
    public analyse(chunk: Buffer, callback?: STDFAnalyserCallback): Promise<Record.RecordBase[]> | void {   

        if (this.checkByteOrder === false && this.opts.byteOrder === BYTE_ORDER_AUTO) {
            this.buffer.setByteOrder(chunk[0] == 0 ? BYTE_ORDER_BE : BYTE_ORDER_LE)
            this.checkByteOrder = true
        }

        if (callback) {
            this.parseChunk(chunk, callback)
        } else {
            const ret: Record.RecordBase[] = []
            this.parseChunk(chunk, (record => {
                ret.push(record)
            }))
            return Promise.resolve(ret)
        }
    }  

    private parseChunk(chunk: Buffer, callback: STDFAnalyserCallback): void {
        do {
            this.size += this.buffer.push(chunk, this.size)
            
            let record: Record.RecordBase | undefined = undefined
            do {
                record = this.parseRecord()
                if (record && (this.opts.allCallback || record.parseResult !== Record.ParseResult.NOTHING)) {
                    callback(record)
                }
            } while (record)

        } while (this.size < chunk.length)

        this.size = 0
    }

    public async analyseSync(chunk: Buffer, callback: STDFAnalyserSyncCallback): Promise<void> {   
        if (this.checkByteOrder === false && this.opts.byteOrder === BYTE_ORDER_AUTO) {
            this.buffer.setByteOrder(chunk[0] == 0 ? BYTE_ORDER_BE : BYTE_ORDER_LE)
            this.checkByteOrder = true
        }

        do {
            this.size += this.buffer.push(chunk, this.size)
            
            let record: Record.RecordBase | undefined = undefined
            do {
                record = this.parseRecord()
                if (record && (this.opts.allCallback || record.parseResult !== Record.ParseResult.NOTHING)) {
                    await callback(record)
                }
            } while (record)

        } while (this.size < chunk.length)

        this.size = 0
    }

    private parseRecord(): Record.RecordBase | undefined {
        if (this.buffer.length() < 4)
            return undefined

        const len = this.buffer.readUInt16();

        if (len > this.buffer.length()) {
            this.buffer.shift(-2)
            return undefined
        }

        const type = this.buffer.readUInt8();
        const sub = this.buffer.readUInt8();

        if (len > (this.buffer.length())) {
            this.buffer.shift(-4)
            return undefined
        }

        let ret: Record.RecordBase = makeRecord(type, sub)

        if ((!this.opts.included && !this.opts.excluded)
            || ((!this.opts.included || this.opts.included.indexOf(ret.name) !== -1)
            && (!this.opts.excluded || this.opts.excluded.indexOf(ret.name) === -1))) {

            ret.parse(this.buffer, len + 4)
        }
        
        this.buffer.pop(len + 4)

        return ret
    }
}
