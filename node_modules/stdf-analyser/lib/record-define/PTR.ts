import { UInt8Data, UInt16Data, UInt32Data, FixedStringData, VariableStringData, FloatData, Int8Data } from "../data-define"
import { RecordBase, RecordType, RecordSub } from "."

export default class PTRRecord extends RecordBase {
    constructor() {
        super('PTR', RecordType.REC_TYPE_15, RecordSub.REC_SUB_10, 'Parametric Test Record')

        this.addField(new UInt32Data('TEST_NUM', 'Test number'))
        this.addField(new UInt8Data('HEAD_NUM', 'Test head number'))
        this.addField(new UInt8Data('SITE_NUM', 'Test site number'))
        this.addField(new UInt8Data('TEST_FLG', 'Test flags (fail, alarm, etc.)'))
        this.addField(new UInt8Data('PARM_FLG', 'Parametric test flags (drift, etc.)'))
        this.addField(new FloatData('RESULT', 'Test result'))
        this.addField(new VariableStringData('TEST_TXT', 'Test description text or label'))
        this.addField(new VariableStringData('ALARM_ID', 'Name of alarm'))

        this.addField(new UInt8Data('OPT_FLAG', 'Optional data flag'))
        this.addField(new Int8Data('RES_SCAL', 'Test results scaling exponent'))
        this.addField(new Int8Data('LLM_SCAL', 'Low limit scaling exponent'))
        this.addField(new Int8Data('HLM_SCAL', 'High limit scaling exponent'))
        this.addField(new FloatData('LO_LIMIT', 'Low test limit value'))
        this.addField(new FloatData('HI_LIMIT', 'High test limit value'))
        this.addField(new VariableStringData('UNITS', 'Test unit'))
        this.addField(new VariableStringData('C_RESFMT', 'ANSI C result format string'))
        this.addField(new VariableStringData('C_LLMFMT', 'ANSI C low limit format string'))
        this.addField(new VariableStringData('C_HLMFMT', 'ANSI C high limit format string'))
        this.addField(new FloatData('LO_SPEC', 'Low specification limit value'))
        this.addField(new FloatData('HI_SPEC', 'High specification limit value'))
    }    
}