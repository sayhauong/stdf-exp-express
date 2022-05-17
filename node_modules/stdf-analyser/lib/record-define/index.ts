import CacheBuffer from "../cache-buffer";
import { DataBase } from "../data-define";

export const RecordType = {
    REC_TYPE_0: 0,
    REC_TYPE_1: 1,
    REC_TYPE_2: 2,
    REC_TYPE_5: 5,
    REC_TYPE_10: 10,
    REC_TYPE_15: 15,
    REC_TYPE_20: 20,
    REC_TYPE_50: 50,
    REC_TYPE_180: 180,
    REC_TYPE_181: 181,
}

export const RecordSub = {
    REC_SUB_10: 10,
    REC_SUB_15: 15,
    REC_SUB_20: 20,
    REC_SUB_30: 30,
    REC_SUB_40: 40,
    REC_SUB_50: 50,
    REC_SUB_60: 60,
    REC_SUB_62: 62,
    REC_SUB_63: 63,
    REC_SUB_70: 70,
    REC_SUB_80: 80
}

export const ParseResult = {
    NOTHING: 0,
    FULL: 1,
    PART: 2
}

export const FIELD_VALUE_INVALID_DEFAULT: string = '-'

export class RecordBase {

    readonly name: string
    readonly recType: number
    readonly recSub: number
    readonly desc?: string

    readonly fields: DataBase[] = []

    parseResult: number = ParseResult.NOTHING

    constructor(name: string, recType: number, recSub: number, desc?: string) {
        this.name = name
        this.recType = recType
        this.recSub = recSub
        this.desc = desc
    }

    parse(buffer: CacheBuffer, limit?: number): void {
        if (limit)
            buffer.setLimitSize(limit)

        try {
            for (let field of this.fields) {
                field.parse(buffer)
            }
        } catch (e: any) {
            this.parseResult = ParseResult.PART
            // throw e
        } finally {        
            if (limit)
                buffer.resetLimitSize()
        }

        this.parseResult = ParseResult.FULL
    }

    addField(field: DataBase): void {
        this.fields.push(field)
    }

    toString(): string {
        let ret: string = '---- [' + this.name + '](' + (this.parseResult === ParseResult.PART ? 'p' : (this.parseResult === ParseResult.FULL ? 'f' : 'n')) + ') ----\n'// + (this.desc || '') + '\n';
        for (let field of this.fields) {
            ret = ret.concat(field.toString() + '\n')
        }

        return ret
    }
}