import { DataBase, FixedStringData, UInt16Data, UInt32Data, UInt8Data, VariableStringData } from "../data-define"
import { RecordBase, RecordType, RecordSub, FIELD_VALUE_INVALID_DEFAULT } from "."

function ValueNotes_SBIN_PF(this: DataBase): string {
    switch (this.value) {
        case 'P':
            return 'PassingBin'
        case 'F':
            return 'FailingBin'
        case ' ':
            return 'Unknown'
        default:
            return this.value.toString()
    }
}

export default class SBRRecord extends RecordBase {
    constructor() {
        super('SBR', RecordType.REC_TYPE_1, RecordSub.REC_SUB_50, 'Software Bin Record')

        this.addField(new UInt8Data('HEAD_NUM', 'Test head number'))
        this.addField(new UInt8Data('SITE_NUM', 'Test site number'))
        this.addField(new UInt16Data('SBIN_NUM', 'Software bin number'))
        this.addField(new UInt32Data('SBIN_CNT', 'Number of parts in bin'))
        this.addField(new FixedStringData('SBIN_PF', 'Pass/fail indication', ValueNotes_SBIN_PF, 1))
        this.addField(new VariableStringData('SBIN_NAM', 'Name of software bin'))
    }    
}