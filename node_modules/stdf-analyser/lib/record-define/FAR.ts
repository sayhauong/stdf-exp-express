import { DataBase, UInt8Data } from "../data-define"
import { RecordBase, RecordType, RecordSub } from "."

function ValueNotes_CPU_TYPE(this: DataBase): string {
    switch(<number>this.value) {
        case 0:
            return 'DEC PDP-11'
        case 1:
            return 'SUN'
        case 2:
            return '386i'
        default:
            return 'Reserved'
    }
}

export default class FARRecord extends RecordBase {
    constructor() {
        super('FAR', RecordType.REC_TYPE_0, RecordSub.REC_SUB_10, 'File Attributes Record')

        this.addField(new UInt8Data('CPU_TYPE', 'CPU type that wrote this file', ValueNotes_CPU_TYPE))
        this.addField(new UInt8Data('STDF_VER', 'STDF version number'))
    }
}