import { RecordBase, RecordType, RecordSub } from ".";

export default class EPSRecord extends RecordBase {
    constructor() {
        super('EPS', RecordType.REC_TYPE_20, RecordSub.REC_SUB_20, 'End Program Section Record')
    }    
}