import { UInt8Data, UInt16Data, UInt32Data, FixedStringData, VariableStringData } from "../data-define"
import { RecordBase, RecordType, RecordSub } from "."

export default class PIRRecord extends RecordBase {
    constructor() {
        super('PIR', RecordType.REC_TYPE_5, RecordSub.REC_SUB_10, 'Part Information Record')

        this.addField(new UInt8Data('HEAD_NUM', 'Test head number'))
        this.addField(new UInt8Data('SITE_NUM', 'Test site number'))
    }    
}