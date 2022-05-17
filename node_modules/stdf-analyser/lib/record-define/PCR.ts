import { DataBase, UInt32Data, UInt8Data } from "../data-define"
import { RecordBase, RecordType, RecordSub, FIELD_VALUE_INVALID_DEFAULT } from "."

function ValueNotes_U4(this: DataBase): string {
    if (this.value === 4294967295) {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value
}


export default class PCRRecord extends RecordBase {
    constructor() {
        super('PCR', RecordType.REC_TYPE_1, RecordSub.REC_SUB_30, 'Part Count Record')

        this.addField(new UInt8Data('HEAD_NUM', 'Test head number'))
        this.addField(new UInt8Data('SITE_NUM', 'Test site number'))
        this.addField(new UInt32Data('PART_CNT', 'Number of parts tested'))
        this.addField(new UInt32Data('RTST_CNT', 'Number of parts retested', ValueNotes_U4))
        this.addField(new UInt32Data('ABRT_CNT', 'Number of aborts during testing', ValueNotes_U4))
        this.addField(new UInt32Data('GOOD_CNT', 'Number of good (passed) parts tested', ValueNotes_U4))
        this.addField(new UInt32Data('FUNC_CNT', 'Number of functional parts tested', ValueNotes_U4))
    }
}