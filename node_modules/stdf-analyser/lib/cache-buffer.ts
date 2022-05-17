import { Buffer } from 'buffer'

export const ERR_OUT_OF_LENGTH: string = 'ERR_OUT_OF_LENGTH'
export const ERR_OUT_OF_LIMIT: string = 'ERR_OUT_OF_LIMIT'

export const BYTE_ORDER_AUTO: number = 0
export const BYTE_ORDER_LE: number = 1
export const BYTE_ORDER_BE: number = 2

export interface CacheBufferOptions {
    bufferSize?: number,
    byteOrder?: number
}

export default class CacheBuffer {
    maxSize: number
    byteOrder: number = BYTE_ORDER_BE
    pos: number = 0
    end: number = 0
    limitSize: number = 0

    buffer: Buffer

    constructor(opts?: CacheBufferOptions) {
        this.maxSize = opts ? (opts.bufferSize || 64 * 1024) : 64 * 1024
        this.byteOrder = opts ? (opts.byteOrder || BYTE_ORDER_BE) : BYTE_ORDER_BE
        this.buffer = Buffer.allocUnsafe(this.maxSize)
    }

    length(): number {
        return this.end - this.pos;
    }

    setByteOrder(order: number) {
        this.byteOrder = order
    }

    setLimitSize(limit: number) {
        this.limitSize = limit
    }

    resetLimitSize() {
        this.limitSize = 0
    }

    shift(diff: number): number {
        this.pos += diff
        return this.pos
    }

    push(buf: Buffer, start: number = 0): number {
        let len = buf.length - start
        if (len > (this.buffer.length - this.end))
            len = this.buffer.length - this.end
        
        buf.copy(this.buffer, this.end, start, start + len)
        this.end += len
        return len
    }

    pop(pos?: number): number {
        pos = pos || this.pos
        // const buf: Buffer = Buffer.allocUnsafe(this.maxSize)
        // this.buffer.copy(buf, 0, pos, this.end)
        // this.buffer = buf
        this.buffer.copy(this.buffer, 0, pos, this.end)
        this.end = (this.end - pos)
        this.pos = 0

        return pos
    }

    check(len: number): void {
        if ((this.end - this.pos) < len)
            throw new Error(ERR_OUT_OF_LENGTH)
        if (this.limitSize > 0 && (this.pos + len) > this.limitSize) 
            throw new Error(ERR_OUT_OF_LIMIT)
    }

    readString(len: number, encoding?: BufferEncoding): string {
        this.check(len)
        const ret: string = this.buffer.toString(encoding || 'ascii', this.pos, this.pos + len);
        this.pos += len
        return ret
    }

    readInt8(): number {
        this.check(1)
        const ret: number = this.buffer.readInt8(this.pos)
        this.pos += 1
        return ret
    }

    readUInt8(): number {
        this.check(1)
        const ret: number = this.buffer.readUInt8(this.pos)
        this.pos += 1
        return ret
    }

    readInt16(): number {
        this.check(2)
        const ret: number = this.byteOrder === BYTE_ORDER_BE ? this.buffer.readInt16BE(this.pos) : this.buffer.readInt16LE(this.pos)
        this.pos += 2
        return ret        
    }

    readUInt16(): number {
        this.check(2)
        const ret: number = this.byteOrder === BYTE_ORDER_BE ? this.buffer.readUInt16BE(this.pos) : this.buffer.readUInt16LE(this.pos)
        this.pos += 2
        return ret        
    }
    
    readInt32(): number {
        this.check(4)
        const ret: number = this.byteOrder === BYTE_ORDER_BE ? this.buffer.readInt32BE(this.pos) : this.buffer.readInt32LE(this.pos)
        this.pos += 4
        return ret        
    }

    readUInt32(): number {
        this.check(4)
        const ret: number = this.byteOrder === BYTE_ORDER_BE ? this.buffer.readUInt32BE(this.pos) : this.buffer.readUInt32LE(this.pos)
        this.pos += 4
        return ret        
    }
    
    readDate(): Date {
        this.check(4)
        const ret: number = this.byteOrder === BYTE_ORDER_BE ? this.buffer.readUInt32BE(this.pos) : this.buffer.readUInt32LE(this.pos)
        this.pos += 4

        return new Date(ret * 1000)
    }

    readFloat(): number {
        this.check(4)
        const ret: number = this.byteOrder === BYTE_ORDER_BE ? this.buffer.readFloatBE(this.pos) : this.buffer.readFloatLE(this.pos)
        this.pos +=4

        return ret
    }

    readDouble(): number {
        this.check(8)
        const ret: number = this.byteOrder === BYTE_ORDER_BE ? this.buffer.readDoubleBE(this.pos) : this.buffer.readDoubleLE(this.pos)
        this.pos += 8

        return ret
    }

    readBuffer(len: number): Buffer {
        this.check(len)
        const ret: Buffer = Buffer.allocUnsafe(len)
        this.buffer.copy(ret, 0, this.pos, this.pos + len)
        this.pos += len
        return ret
    }

}