import CacheBuffer from './cache-buffer'
import { FIELD_VALUE_INVALID_DEFAULT, RecordBase } from './record-define'

type ValueNotesFunc = (this: DataBase) => string 

function DateNotesFunc (this: DataBase): string {
    const d = this.value! as Date
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2)
            + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2)
}

export interface DataOptions {

}

export abstract class DataBase {
    readonly name: string
    value?: any = undefined
    len?: number = undefined
    readonly desc?: string
    valueNotes?: ValueNotesFunc

    constructor(name: string)
    constructor(name: string, desc?: string, valueNotes?: ValueNotesFunc)
    constructor(name: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number) 
    constructor(name: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number, value?: any) {
        this.name = name
        this.value = value || undefined
        this.len = len || undefined
        this.desc = desc || undefined
        this.valueNotes = valueNotes || undefined
        if (this.valueNotes) {
            this.valueNotes.bind(this)
        }
    }

    toValueString(): string { return (this.value !== undefined ? this.value.toString() : FIELD_VALUE_INVALID_DEFAULT) }
    toValueNotes(): string { return this.valueNotes ? this.valueNotes() : this.toValueString() }
    toDescript(): string { return this.name + ' - ' + this.desc || '' }
    toString(): string { return this.name + ' : ' + (this.valueNotes ? this.valueNotes() : this.toValueString()) } 

    abstract parse(buf: CacheBuffer): number
}

export abstract class DataArrayBase<T extends DataBase> extends DataBase {
    readonly record: RecordBase
    readonly indexName: string
    readonly value: T[] = []

    protected type!: new (name: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number) => T

    constructor(record: RecordBase, name: string, indexName: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number) {
        super(name, desc, valueNotes, len)

        this.record = record
        this.indexName = indexName
    }

    toValueString(): string {
        let ret: string = '[' + this.value.length + ']'
        for (let item of this.value) {
            ret = ret.concat(item.toValueString() + '|')
        }
        return ret 
    }

    toValueNotes(): string {
        let ret: string = '[' + this.value.length + ']'
        for (let item of this.value) {
            ret = ret.concat(item.valueNotes ? item.valueNotes() : item.toValueString() + '|')
        }
        return ret         
    }

    toDescript(): string {        
         return this.name + ' - ' + this.desc || '' 
    }

    toString(): string {
        let ret: string = this.name + ' items(' + this.value.length + '):\n'
        for (let item of this.value) {
            ret = ret.concat(item.name + ': ' + (item.valueNotes ? item.valueNotes() : item.toValueString()) + '\n')
        }
        ret = ret.concat('-- end')
        return ret 
    } 

    parse(buf: CacheBuffer): number {
        const count =  this.record.fields.find(element => element.name === this.indexName)?.value
        let ret: number = 0
        for (let i = 0; i < count; ++ i) {
            // const item: T = new this.type('item' + i, undefined, this.valueNotes, this.len)
            const item = this.makeItem('item' + i, undefined, this.valueNotes, this.len)
            ret += item.parse(buf)
            this.value.push(item)
        }

        this.len = ret

         return ret
    }

    abstract makeItem(name: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number): T
} 

export class UInt8Data extends DataBase {
    parse(buf: CacheBuffer): number {
        this.value = buf.readUInt8()
        this.len = 1
        return 1
    }
}

export class Int8Data extends DataBase {
    parse(buf: CacheBuffer): number {
        this.value = buf.readInt8()
        this.len = 1
        return 1
    }
}

export class UInt16Data extends DataBase {
    parse(buf: CacheBuffer): number {
        this.value = buf.readUInt16()
        this.len = 2
        return 2
    }
}

export class Int16Data extends DataBase {
    parse(buf: CacheBuffer): number {
        this.value = buf.readInt16()
        this.len = 2
        return 2
    }
}

export class UInt32Data extends DataBase {
    parse(buf: CacheBuffer): number {
        this.value = buf.readUInt32()
        this.len = 4
        return 4
    }
}

export class Int32Data extends DataBase {
    parse(buf: CacheBuffer): number {
        this.value = buf.readInt32()
        this.len = 4
        return 4
    }
}

export class FloatData extends DataBase {
    parse(buf: CacheBuffer): number {
        this.value = buf.readFloat()
        this.len = 4
        return 4
    }
}

export class DoubleData extends DataBase {
    parse(buf: CacheBuffer): number {
        this.value = buf.readDouble()
        this.len = 8
        return 8
    }
}

export class FixedStringData extends DataBase {
    parse(buf: CacheBuffer): number {
        this.value = buf.readString(this.len!)
        return this.len!
    }
}

export class VariableStringData extends DataBase {
    parse(buf: CacheBuffer): number {
        const len = buf.readUInt8()
        this.value = buf.readString(len)
        this.len = len + 1
        return len + 1
    }
}

export class DateData extends DataBase {
    constructor(name: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number, value?: any) {
        super(name, desc,valueNotes, len)

        this.valueNotes = this.valueNotes || DateNotesFunc
    }
    parse(buf: CacheBuffer): number {
        this.value = buf.readDate()
        this.len = 4
        return 4
    }
}

export class BufferData extends DataBase {
    parse(buf: CacheBuffer): number {
        const len = buf.readUInt8()
        this.value = buf.readBuffer(len)
        this.len = len + 1
        return len + 1
    }
}

export class Buffer2Data extends DataBase {
    parse(buf: CacheBuffer): number {
        const len = buf.readUInt16()
        this.value = buf.readBuffer(len)
        this.len = len + 2
        return len + 2
    }
}

export class UInt8DataArray extends DataArrayBase<UInt8Data> {
    makeItem(name: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number): UInt8Data {
        return new UInt8Data(name, desc, valueNotes, len)
    }
}

export class UInt16DataArray extends DataArrayBase<UInt16Data> {
    makeItem(name: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number): UInt16Data {
        return new UInt16Data(name, desc, valueNotes, len)
    }
}

export class UInt32DataArray extends DataArrayBase<UInt32Data> {
    makeItem(name: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number): UInt32Data {
        return new UInt32Data(name, desc, valueNotes, len)
    }
}

export class FloatDataArray extends DataArrayBase<FloatData> {
    makeItem(name: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number): FloatData {
        throw new FloatData(name, desc, valueNotes, len)
    }
}

export class VariableStringDataArray extends DataArrayBase<VariableStringData> {
    makeItem(name: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number): VariableStringData {
        return new VariableStringData(name, desc, valueNotes, len)
    }
}

// type UInt16DataArray = new (record: RecordBase, name: string, indexName: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number) => DataArrayBase<UInt16Data> 
//     // type!: new (name: string, desc?: string, valueNotes?: ValueNotesFunc, len?: number) => T

// const a = new UInt16DataArray(null, '', '')