import { UInt16Data, VariableStringData, UInt8Data, DataBase } from "../data-define"
import { RecordBase, RecordType, RecordSub, FIELD_VALUE_INVALID_DEFAULT } from "."

function ValueNotes_CHAN_TYP(this: DataBase): string {
    if (this.value === 0) {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value.toString()
}

function ValueNotes_HEAD_NUM(this: DataBase): string {
    if (this.value === 1) {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value.toString()
}

function ValueNotes_SITE_NUM(this: DataBase): string {
    if (this.value === 1) {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value.toString()
}

export default class PMRRecord extends RecordBase {
    constructor() {
        super('PMR', RecordType.REC_TYPE_1, RecordSub.REC_SUB_60, 'Pin Map Record')

        this.addField(new UInt16Data('PMR_INDX', 'Unique index associated with pin'))
        this.addField(new UInt16Data('CHAN_TYP', 'Channel type', ValueNotes_CHAN_TYP))
        this.addField(new VariableStringData('CHAN_NAM', 'Channel name'))
        this.addField(new VariableStringData('PHY_NAM', 'Physical name of pin'))
        this.addField(new VariableStringData('LOG_NAM', 'Logical name of pin'))
        this.addField(new UInt8Data('HEAD_NUM', 'Head number associated with channel', ValueNotes_HEAD_NUM))
        this.addField(new UInt8Data('SITE_NUM', 'Site number associated with channel', ValueNotes_SITE_NUM))
    }    
}