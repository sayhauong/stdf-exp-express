import { RecordBase, RecordType } from ".";

export default class R180Record extends RecordBase {
    constructor() {
        super('R180', RecordType.REC_TYPE_180, 0, 'Reserved for use by Image software')
    }    
}