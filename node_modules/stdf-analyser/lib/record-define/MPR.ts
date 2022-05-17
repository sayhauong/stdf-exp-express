import { FixedStringData, FloatData, FloatDataArray, Int8Data, UInt16Data, UInt16DataArray, UInt32Data, UInt8Data, UInt8DataArray, VariableStringData } from "../data-define"
import { RecordBase, RecordType, RecordSub } from "."

export default class MPRRecord extends RecordBase {
    constructor() {
        super('MPR', RecordType.REC_TYPE_15, RecordSub.REC_SUB_15, 'Multiple-Result Parametric Record')

        this.addField(new UInt32Data('TEST_NUM', 'Test number'))
        this.addField(new UInt8Data('HEAD_NUM', 'Test head number'))
        this.addField(new UInt8Data('SITE_NUM', 'Test site number'))
        this.addField(new UInt8Data('TEST_FLG', 'Test flags (fail, alarm, etc.)'))
        this.addField(new UInt8Data('PARM_FLG', 'Parametric test flags (drift, etc.)'))
        this.addField(new UInt16Data('RTN_ICNT', 'Count (j) of PMR indexes'))
        this.addField(new UInt16Data('RSLT_CNT', 'Count (k) of returned results'))
        this.addField(new UInt8DataArray(this, 'RTN_STAT', 'RTN_ICNT', 'Array of returned states '))
        this.addField(new FloatDataArray(this, 'RTN_RSLT','RSLT_CNT', 'Array of returned results'))
        this.addField(new VariableStringData('TEST_TXT', 'Descriptive text or label'))
        this.addField(new VariableStringData('ALARM_ID', 'Name of alarm'))

        this.addField(new UInt8Data('OPT_FLAG', 'Optional data flag'))
        this.addField(new Int8Data('RES_SCAL', 'Test result scaling exponent '))
        this.addField(new Int8Data('LLM_SCAL', 'Test low limit scaling exponent'))
        this.addField(new Int8Data('HLM_SCAL', 'Test high limit scaling exponent '))
        this.addField(new FloatData('LO_LIMIT', 'Test low limit value'))
        this.addField(new FloatData('HI_LIMIT', 'Test high limit value'))
        this.addField(new FloatData('START_IN', 'Starting input value (condition)'))
        this.addField(new FloatData('INCR_IN', 'Increment of input condition'))
        this.addField(new UInt16DataArray(this, 'RTN_INDX', 'RTN_ICNT', 'Array of PMR indexes'))
        this.addField(new VariableStringData('UNITS', 'Units of returned results'))
        this.addField(new VariableStringData('UNITS_IN', 'Input condition units'))
        this.addField(new VariableStringData('C_RESFMT', 'ANSI C result format string'))
        this.addField(new VariableStringData('C_LLMFMT', 'ANSI C low limit format string'))
        this.addField(new VariableStringData('C_HLMFMT', 'ANSI C high limit format string'))
        this.addField(new FloatData('LO_SPEC', 'Low specification limit value'))
        this.addField(new FloatData('HI_SPEC', 'High specification limit value'))        
    }    
}