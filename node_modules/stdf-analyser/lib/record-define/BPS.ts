import { UInt8Data, UInt16Data, UInt32Data, FixedStringData, VariableStringData } from "../data-define"
import { RecordBase, RecordType, RecordSub } from "."

export default class BPSRecord extends RecordBase {
    constructor() {
        super('BPS', RecordType.REC_TYPE_20, RecordSub.REC_SUB_10, 'Begin Program Section Record')

        this.addField(new VariableStringData('SEQ_NAME', 'Program section (or sequencer) name'))
    }    
}