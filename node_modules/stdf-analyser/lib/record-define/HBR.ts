import { DataBase, FixedStringData, UInt16Data, UInt32Data, UInt8Data, VariableStringData } from "../data-define"
import { RecordBase, RecordType, RecordSub, FIELD_VALUE_INVALID_DEFAULT } from "."

function ValueNotes_HBIN_PF(this: DataBase): string {
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

export default class HBRRecord extends RecordBase {
    constructor() {
        super('HBR', RecordType.REC_TYPE_1, RecordSub.REC_SUB_40, 'Hardware Bin Record')

        this.addField(new UInt8Data('HEAD_NUM', 'Test head number'))
        this.addField(new UInt8Data('SITE_NUM', 'Test site number'))
        this.addField(new UInt16Data('HBIN_NUM', 'Hardware bin number'))
        this.addField(new UInt32Data('HBIN_CNT', 'Number of parts in bin'))
        this.addField(new FixedStringData('HBIN_PF', 'Pass/fail indication', ValueNotes_HBIN_PF, 1))
        this.addField(new VariableStringData('HBIN_NAM', 'Name of hardware bin'))
    }    
}