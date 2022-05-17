import { UInt16Data, UInt16DataArray, VariableStringData } from "../data-define"
import { RecordBase, RecordType, RecordSub } from "."

export default class PGRRecord extends RecordBase {
    constructor() {
        super('PGR', RecordType.REC_TYPE_1, RecordSub.REC_SUB_62, 'Pin Group Record')

        this.addField(new UInt16Data('GRP_INDX', 'Unique index associated with pin group'))
        this.addField(new VariableStringData('GRP_NAM', 'Name of pin group'))
        this.addField(new UInt16Data('INDX_CNT', 'Count (k) of PMR indexes'))
        this.addField(new UInt16DataArray(this, 'PMR_INDX', 'INDX_CNT', 'Array of indexes for pins in the group'))
    }    
}