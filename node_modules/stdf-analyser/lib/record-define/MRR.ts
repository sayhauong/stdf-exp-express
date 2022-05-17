import { DataBase, DateData, FixedStringData, VariableStringData } from "../data-define"
import { RecordBase, RecordType, RecordSub, FIELD_VALUE_INVALID_DEFAULT } from "."

function ValueNotes_DISP_COD(this: DataBase): string {
    if (this.value === ' ') {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value
}

export default class MRRRecord extends RecordBase {
    constructor() {
        super('MRR', RecordType.REC_TYPE_1, RecordSub.REC_SUB_20, 'Master Results Record')

        this.addField(new DateData('FINISH_T', 'Date and time last part tested'))
        this.addField(new FixedStringData('DISP_COD', 'Lot disposition code', ValueNotes_DISP_COD, 1))
        this.addField(new VariableStringData('USR_DESC', 'Lot description supplied by user'))
        this.addField(new VariableStringData('EXC_DESC', 'Lot description supplied by exec'))
    }
}