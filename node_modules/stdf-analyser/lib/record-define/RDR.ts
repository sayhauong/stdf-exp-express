import { UInt16Data, UInt16DataArray } from "../data-define"
import { RecordBase, RecordType, RecordSub } from "."

export default class RDRRecord extends RecordBase {
    constructor() {
        super('RDR', RecordType.REC_TYPE_1, RecordSub.REC_SUB_70, 'Retest Data Record')

        this.addField(new UInt16Data('NUM_BINS', 'Number (k) of bins being retested'))
        this.addField(new UInt16DataArray(this, 'RTST_BIN', 'NUM_BINS', 'Array of retest bin numbers'))
    }    
}