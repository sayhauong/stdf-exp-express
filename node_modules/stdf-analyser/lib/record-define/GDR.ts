import { Buffer2Data } from "../data-define"
import { RecordBase, RecordType, RecordSub } from "."

export default class GDRRecord extends RecordBase {
    constructor() {
        super('GDR', RecordType.REC_TYPE_50, RecordSub.REC_SUB_10, 'Generic Data Record')

        // this.addField(new UInt16Data('FLD_CNT', 'Count of data fields in record'))
        // GEN_DATA: Data type code and data for one field (Repeat GEN_DATA for each data field)
        this.addField(new Buffer2Data('GEN_DATA', 'Data type code and data for one field'))
    }    
}