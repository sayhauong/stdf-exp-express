import { DateData, VariableStringData } from "../data-define";
import { RecordBase, RecordSub, RecordType } from ".";

export default class ATRRecord extends RecordBase {
    constructor() {
        super('ATR', RecordType.REC_TYPE_0, RecordSub.REC_SUB_20, 'Audit Trail Record')

        this.addField(new DateData('MOD_TIM', 'Date and time of STDF file modification'))
        this.addField(new VariableStringData('CMD_LINE', 'Command line of program'))
    }    
}