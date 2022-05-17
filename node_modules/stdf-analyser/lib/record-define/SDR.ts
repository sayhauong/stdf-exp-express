import { UInt8Data, VariableStringData, UInt8DataArray } from "../data-define"
import { RecordBase, RecordType, RecordSub } from "."

export default class SDRRecord extends RecordBase {
    constructor() {
        super('SDR', RecordType.REC_TYPE_1, RecordSub.REC_SUB_80, 'Site Description Record')

        this.addField(new UInt8Data('HEAD_NUM', 'Test head number'))
        this.addField(new UInt8Data('SITE_GRP', 'Site group number'))
        this.addField(new UInt8Data('SITE_CNT', 'Number (k) of test sites in site group'))
        this.addField(new UInt8DataArray(this, 'SITE_NUM', 'SITE_CNT', 'Array of test site numbers'))
        this.addField(new VariableStringData('HAND_TYP', 'Handler or prober type'))
        this.addField(new VariableStringData('HAND_ID', 'Handler or prober ID'))
        this.addField(new VariableStringData('CARD_TYP', 'Probe card type'))
        this.addField(new VariableStringData('CARD_ID', 'Probe card ID'))
        this.addField(new VariableStringData('LOAD_TYP', 'Load board type'))
        this.addField(new VariableStringData('LOAD_ID', 'Load board ID'))
        this.addField(new VariableStringData('DIB_TYP', 'DIB board type'))
        this.addField(new VariableStringData('DIB_ID', 'DIB board ID'))
        this.addField(new VariableStringData('CABL_TYP', 'Interface cable type'))
        this.addField(new VariableStringData('CABL_ID', 'Interface cable ID'))
        this.addField(new VariableStringData('CONT_TYP', 'Handler contactor type'))
        this.addField(new VariableStringData('CONT_ID', 'Handler contactor ID'))
        this.addField(new VariableStringData('LASR_TYP', 'Laser type'))
        this.addField(new VariableStringData('LASR_ID', 'Laser ID'))
        this.addField(new VariableStringData('EXTR_TYP', 'Extra equipment type field'))
        this.addField(new VariableStringData('EXTR_ID', 'Extra equipment ID'))
    }    
}

