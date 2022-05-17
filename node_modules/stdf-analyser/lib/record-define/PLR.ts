import { UInt8Data, UInt16Data, UInt32Data, FixedStringData, VariableStringData, DataArrayBase, UInt16DataArray, UInt8DataArray, VariableStringDataArray } from "../data-define"
import { RecordBase, RecordType, RecordSub } from "."

export default class PLRRecord extends RecordBase {
    constructor() {
        super('PLR', RecordType.REC_TYPE_1, RecordSub.REC_SUB_63, 'Pin List Record')

        this.addField(new UInt16Data('GRP_CNT', 'Count (k) of pins or pin groups'))
        this.addField(new UInt16DataArray(this, 'GRP_INDX', 'GRP_CNT', 'Array of pin or pin group indexes'))
        this.addField(new UInt16DataArray(this, 'GRP_MODE', 'GRP_CNT', 'Operating mode of pin group'))
        this.addField(new UInt8DataArray(this, 'GRP_RADX', 'GRP_CNT', 'Display radix of pin group'))

        this.addField(new VariableStringDataArray(this, 'PGM_CHAR', 'GRP_CNT', 'Program state encoding characters'))
        this.addField(new VariableStringDataArray(this, 'RTN_CHAR', 'GRP_CNT', 'Return state encoding characters'))
        this.addField(new VariableStringDataArray(this, 'PGM_CHAL', 'GRP_CNT', 'Program state encoding characters'))
        this.addField(new VariableStringDataArray(this, 'RTN_CHAL', 'GRP_CNT', 'Return state encoding characters'))
    }    
}