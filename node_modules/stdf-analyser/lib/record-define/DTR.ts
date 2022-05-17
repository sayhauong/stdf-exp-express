import { VariableStringData } from "../data-define"
import { RecordBase, RecordType, RecordSub } from "."

export default class DTRRecord extends RecordBase {
    constructor() {
        super('DTR', RecordType.REC_TYPE_50, RecordSub.REC_SUB_30, 'Datalog Text Record')

        this.addField(new VariableStringData('TEXT_DAT', 'ASCII text string'))
    }    
}