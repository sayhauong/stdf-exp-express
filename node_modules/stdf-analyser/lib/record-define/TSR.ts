import { UInt8Data, UInt32Data, FixedStringData, VariableStringData, FloatData, DataBase } from "../data-define"
import { RecordBase, RecordType, RecordSub, FIELD_VALUE_INVALID_DEFAULT } from "."

function ValueNotes_TEST_TYP(this: DataBase): string {
    switch(this.value) {
        case 'P':
            return 'Parametric test'
        case 'F':
            return 'Functional test'
        case 'M':
            return 'Multi-result parametric test'
        default:
            return FIELD_VALUE_INVALID_DEFAULT
    }
}

function ValueNotes_U4(this: DataBase): string {
    if (this.value === 4,294,967,295) {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value.toString()
}

export default class TSRRecord extends RecordBase {
    constructor() {
        super('TSR', RecordType.REC_TYPE_10, RecordSub.REC_SUB_30, 'Test Synopsis Record')

        this.addField(new UInt8Data('HEAD_NUM', 'Test head number'))
        this.addField(new UInt8Data('SITE_NUM', 'Test site number'))
        this.addField(new FixedStringData('TEST_TYP', 'Test type', ValueNotes_TEST_TYP, 1))
        this.addField(new UInt32Data('TEST_NUM', 'Test number'))
        this.addField(new UInt32Data('EXEC_CNT', 'Number of test executions', ValueNotes_U4))
        this.addField(new UInt32Data('FAIL_CNT', 'Number of test failures', ValueNotes_U4))
        this.addField(new UInt32Data('ALRM_CNT', 'Number of alarmed tests', ValueNotes_U4))
        this.addField(new VariableStringData('TEST_NAM', 'Test name'))
        this.addField(new VariableStringData('SEQ_NAME', 'Sequencer (program segment/flow) name'))
        this.addField(new VariableStringData('TEST_LBL', 'Test label or text'))
        this.addField(new UInt8Data('OPT_FLAG', 'Optional data flag'))
        this.addField(new FloatData('TEST_TIM', 'Average test execution time in seconds'))
        this.addField(new FloatData('TEST_MIN', 'Lowest test result value'))
        this.addField(new FloatData('TEST_MAX', 'Highest test result value'))
        this.addField(new FloatData('TST_SUMS', 'Sum of test result values'))
        this.addField(new FloatData('TST_SQRS', 'Sum of squares of test result values'))
    }    
}