import { RecordBase, RecordType } from ".";

export default class R181Record extends RecordBase {
    constructor() {
        super('R181', RecordType.REC_TYPE_181, 0, 'Reserved for use by IG900 software')
    }    
}