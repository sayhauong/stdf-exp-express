import { UInt8Data, UInt16Data, UInt32Data, FixedStringData, VariableStringData, Int16Data, BufferData, DataBase } from "../data-define"
import { RecordBase, RecordType, RecordSub, FIELD_VALUE_INVALID_DEFAULT } from "."

function ValueNotes_U2(this: DataBase): string {
    if (this.value === 65535) {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value.toString()
}

function ValueNotes_U4(this: DataBase): string {
    if (this.value === 0) {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value.toString()
}

function ValueNotes_I2(this: DataBase): string {
    if (this.value === -32768) {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value.toString()
}


export default class PRRRecord extends RecordBase {
    constructor() {
        super('PRR', RecordType.REC_TYPE_5, RecordSub.REC_SUB_20, 'Part Results Record')

        this.addField(new UInt8Data('HEAD_NUM', 'Test head number'))
        this.addField(new UInt8Data('SITE_NUM', 'Test site number'))
        // this.addField(new FixedStringData('PART_FLG', 'Part information flag', undefined, 1))
        this.addField(new UInt8Data('PART_FLG', 'Part information flag'))
        this.addField(new UInt16Data('NUM_TEST', 'Number of tests executed'))
        this.addField(new UInt16Data('HARD_BIN', 'Hardware bin number'))
        this.addField(new UInt16Data('SOFT_BIN', 'Software bin number', ValueNotes_U2))
        this.addField(new Int16Data('X_COORD', '(Wafer) X coordinate', ValueNotes_U4))
        this.addField(new Int16Data('Y_COORD', '(Wafer) Y coordinate', ValueNotes_U4))
        this.addField(new UInt32Data('TEST_T', 'Elapsed test time in milliseconds', ValueNotes_I2))
        this.addField(new VariableStringData('PART_ID', 'Part identification'))
        this.addField(new VariableStringData('ART_TXT', 'Part description text'))
        this.addField(new BufferData('PART_FIX', 'Part repair information'))
    }    
}