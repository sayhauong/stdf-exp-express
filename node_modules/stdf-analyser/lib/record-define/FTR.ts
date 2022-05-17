import { UInt8Data, UInt16Data, UInt32Data, FixedStringData, VariableStringData, Int32Data, Buffer2Data, UInt16DataArray, UInt8DataArray } from "../data-define"
import { RecordBase, RecordType, RecordSub } from "."

export default class FTRRecord extends RecordBase {
    constructor() {
        super('FTR', RecordType.REC_TYPE_15, RecordSub.REC_SUB_20, 'Functional Test Record')

        this.addField(new UInt32Data('TEST_NUM', 'Test number'))
        this.addField(new UInt8Data('HEAD_NUM', 'Test head number'))
        this.addField(new UInt8Data('SITE_NUM', 'Test site number'))
        this.addField(new UInt8Data('TEST_FLG', 'Test flags (fail, alarm, etc.)'))
        this.addField(new UInt8Data('OPT_FLAG', 'Optional data flag'))
        this.addField(new UInt32Data('CYCL_CNT', 'Cycle count of vector'))
        this.addField(new UInt32Data('REL_VADR', 'Relative vector address '))
        this.addField(new UInt32Data('REPT_CNT', 'Repeat count of vector'))
        this.addField(new UInt32Data('NUM_FAIL', 'Number of pins with 1 or more failures'))
        this.addField(new Int32Data('XFAIL_AD', 'X logical device failure address'))
        this.addField(new Int32Data('YFAIL_AD', 'Y logical device failure address'))
        this.addField(new Int32Data('VECT_OFF', 'Offset from vector of interest'))
        this.addField(new UInt16Data('RTN_ICNT', 'Count (j) of return data PMR indexes'))
        this.addField(new UInt16Data('PGM_ICNT', 'Count (k) of programmed state indexes'))
        this.addField(new UInt16DataArray(this, 'RTN_INDX', 'RTN_ICNT', 'Array of return data PMR indexes'))
        this.addField(new UInt8DataArray(this, 'RTN_STAT', 'RTN_ICNT', 'Array of returned states'))
        this.addField(new UInt16DataArray(this, 'PGM_INDX', 'PGM_ICNT', 'Array of programmed state indexes'))
        this.addField(new UInt8DataArray(this, 'PGM_STAT', 'PGM_ICNT', 'Array of programmed states'))
        this.addField(new Buffer2Data('FAIL_PIN', 'Failing pin bitfield'))
        this.addField(new VariableStringData('VECT_NAM', 'Vector module pattern name'))
        this.addField(new VariableStringData('TIME_SET', 'Time set name'))
        this.addField(new VariableStringData('OP_CODE', 'Vector Op Code'))
        this.addField(new VariableStringData('TEST_TXT', 'Descriptive text or label'))
        this.addField(new VariableStringData('ALARM_ID', 'Name of alarm'))
        this.addField(new VariableStringData('PROG_TXT', 'Additional programmed information'))
        this.addField(new VariableStringData('RSLT_TXT', 'Additional result information'))

        this.addField(new UInt8Data('PATG_NUM', 'Pattern generator number'))
        this.addField(new Buffer2Data('SPIN_MAP', 'Bit map of enabled comparators'))
    }    
}