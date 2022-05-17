import { DateData, UInt8Data, UInt16Data, VariableStringData, FixedStringData, DataBase } from "../data-define"
import { RecordBase, RecordType, RecordSub, FIELD_VALUE_INVALID_DEFAULT } from "."

function ValueNotes_MODE_COD(this: DataBase): string {
    switch(this.value) {
        case 'A':
            return 'AEL mode'
        case 'C':
            return 'Checker mode'
        case 'D':
            return 'Development/Debug mode'
        case 'E':
            return 'Engineering mode'
        case 'M':
            return 'Maintenance mode'
        case 'P':
            return 'Production test mode'
        case 'Q':
            return 'Quality Control'
        default:
            return 'unknown mode'
    }
}

function ValueNotes_RTST_COD(this: DataBase): string {
    switch (this.value) {
        case 'Y':
            return 'Yes'
        case 'N':
            return 'No'
        case ' ':
            return 'unknown'
        default:
            return this.value
    }
}

function ValueNotes_PROT_COD(this: DataBase): string {
    if (this.value === ' ') {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value
}

function ValueNotes_BURN_TIM(this: DataBase): string {
    if (this.value === 65535) {
        return FIELD_VALUE_INVALID_DEFAULT
    }
    return this.value
}

export default class MIRRecord extends RecordBase {
    constructor() {
        super('MIR', RecordType.REC_TYPE_1, RecordSub.REC_SUB_10, 'Master Information Record')

        this.addField(new DateData('SETUP_T', 'Date and time of job setup'))
        this.addField(new DateData('START_T', 'Date and time first part tested'))
        this.addField(new UInt8Data('STAT_NUM', 'Tester station number'))
        this.addField(new FixedStringData('MODE_COD', 'Test mode code (e.g. prod or dev)', ValueNotes_MODE_COD, 1))
        this.addField(new FixedStringData('RTST_COD', 'Lot retest code', ValueNotes_RTST_COD, 1))
        this.addField(new FixedStringData('PROT_COD', 'Data protection code', ValueNotes_PROT_COD, 1))
        this.addField(new UInt16Data('BURN_TIM', 'Burn-in time (in minutes)', ValueNotes_BURN_TIM))
        this.addField(new FixedStringData('CMOD_COD', 'Command mode code', undefined, 1))
        this.addField(new VariableStringData('LOT_ID', 'Lot ID (customer specified)'))
        this.addField(new VariableStringData('PART_TYP', 'Part Type (or product ID)'))
        this.addField(new VariableStringData('NODE_NAM', 'Name of node that generated data'))
        this.addField(new VariableStringData('TSTR_TYP', 'Tester type'))
        this.addField(new VariableStringData('JOB_NAM', 'Job name (test program name)'))
        this.addField(new VariableStringData('JOB_REV', '(test program) revision number'))
        this.addField(new VariableStringData('SBLOT_ID', 'Sublot ID length'))
        this.addField(new VariableStringData('OPER_NAM', 'Operator name or ID (at setup time)'))
        this.addField(new VariableStringData('EXEC_TYP', 'Tester executive software type'))
        this.addField(new VariableStringData('EXEC_VER', ' Tester exec software version number'))
        this.addField(new VariableStringData('TEST_COD', 'Test phase or step code'))
        this.addField(new VariableStringData('TST_TEMP', 'Test temperature'))
        this.addField(new VariableStringData('USER_TXT', 'Generic user text'))
        this.addField(new VariableStringData('AUX_FILE', 'Name of auxiliary data file'))
        this.addField(new VariableStringData('PKG_TYP', 'Package type'))
        this.addField(new VariableStringData('FAMLY_ID', 'Product family ID'))
        this.addField(new VariableStringData('DATE_COD', 'Date code'))
        this.addField(new VariableStringData('FACIL_ID', 'Test facility ID'))
        this.addField(new VariableStringData('FLOOR_ID', 'Test floor ID'))
        this.addField(new VariableStringData('PROC_ID', 'Fabrication process ID'))
        this.addField(new VariableStringData('OPER_FRQ', 'Operation frequency or step'))
        this.addField(new VariableStringData('SPEC_NAM', 'Test specification name'))
        this.addField(new VariableStringData('SPEC_VER', 'Test specification version number'))
        this.addField(new VariableStringData('FLOW_ID', 'Test flow ID'))
        this.addField(new VariableStringData('SETUP_ID', 'Test setup ID'))
        this.addField(new VariableStringData('DSGN_REV', 'Device design revision'))
        this.addField(new VariableStringData('ENG_ID', 'Engineering lot ID'))
        this.addField(new VariableStringData('ROM_COD', 'ROM code ID'))
        this.addField(new VariableStringData('SERL_NUM', 'Tester serial number'))        
        this.addField(new VariableStringData('SUPR_NAM', 'Supervisor name or ID'))  
    }
}
