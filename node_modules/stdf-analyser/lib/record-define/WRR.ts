import { UInt8Data, UInt32Data, VariableStringData, DateData, DataBase } from "../data-define"
import { RecordBase, RecordType, RecordSub, FIELD_VALUE_INVALID_DEFAULT } from "."

function ValueNotes_SITE_GRP(this: DataBase): string {
    if (this.value === 255) {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value.toString()
}

function ValueNotes_U4(this: DataBase): string {
    if (this.value === 4294967295) {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value.toString()
}


export default class WRRRecord extends RecordBase {
    constructor() {
        super('WRR', RecordType.REC_TYPE_2, RecordSub.REC_SUB_20, 'Wafer Results Record')

        this.addField(new UInt8Data('HEAD_NUM', 'Test head number'))
        this.addField(new UInt8Data('SITE_GRP', 'Site group number', ValueNotes_SITE_GRP))
        this.addField(new DateData('FINISH_T', 'Date and time last part tested'))
        this.addField(new UInt32Data('PART_CNT', 'Number of parts tested'))
        this.addField(new UInt32Data('RTST_CNT', 'Number of parts retested', ValueNotes_U4))
        this.addField(new UInt32Data('ABRT_CNT', 'Number of aborts during testing', ValueNotes_U4))        
        this.addField(new UInt32Data('GOOD_CNT', 'Number of good (passed) parts tested', ValueNotes_U4))
        this.addField(new UInt32Data('FUNC_CNT', 'Number of functional parts tested', ValueNotes_U4))
        this.addField(new VariableStringData('WAFER_ID', 'Wafer ID'))
        this.addField(new VariableStringData('FABWF_ID', 'Fab wafer ID'))
        this.addField(new VariableStringData('FRAME_ID', 'Wafer frame ID'))
        this.addField(new VariableStringData('MASK_ID', 'Wafer mask ID'))
        this.addField(new VariableStringData('USR_DESC', 'Wafer description supplied by user'))
        this.addField(new VariableStringData('EXC_DESC', 'Wafer description supplied by exec'))
    }    
}