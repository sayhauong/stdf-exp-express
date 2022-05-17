import ATRRecord from "./ATR";
import { RecordBase, RecordSub, RecordType } from ".";
import BPSRecord from "./BPS";
import DTRRecord from "./DTR";
import EPSRecord from "./EPS";
import FARRecord from "./FAR";
import FTRRecord from "./FTR";
import GDRRecord from "./GDR";
import HBRRecord from "./HBR";
import MIRRecord from "./MIR";
import MPRRecord from "./MPR";
import MRRRecord from "./MRR";
import PCRRecord from "./PCR";
import PGRRecord from "./PGR";
import PIRRecord from "./PIR";
import PLRRecord from "./PLR";
import PMRRecord from "./PMR";
import PRRRecord from "./PRR";
import PTRRecord from "./PTR";
import R180Record from "./R180";
import R181Record from "./R181";
import RDRRecord from "./RDR";
import SBRRecord from "./SBR";
import SDRRecord from "./SDR";
import TSRRecord from "./TSR";
import UKNRecord from "./UKN";
import WCRRecord from "./WCR";
import WIRRecord from "./WIR";
import WRRRecord from "./WRR";

export function makeRecord(type: number, sub: number): RecordBase {
    switch (type) {
        case RecordType.REC_TYPE_0:
            switch (sub) {
                case RecordSub.REC_SUB_10:
                    return new FARRecord()
                case RecordSub.REC_SUB_20:
                    return new ATRRecord()

            }
        case RecordType.REC_TYPE_1:
            switch (sub) {
                case RecordSub.REC_SUB_10:
                    return new MIRRecord()
                case RecordSub.REC_SUB_20:
                    return new MRRRecord()
                case RecordSub.REC_SUB_30:
                    return new PCRRecord()
                case RecordSub.REC_SUB_40:
                    return new HBRRecord()
                case RecordSub.REC_SUB_50:
                    return new SBRRecord()
                case RecordSub.REC_SUB_60:
                    return new PMRRecord()
                case RecordSub.REC_SUB_62:
                    return new PGRRecord()
                case RecordSub.REC_SUB_63:
                    return new PLRRecord()
                case RecordSub.REC_SUB_70:
                    return new RDRRecord()
                case RecordSub.REC_SUB_80:
                    return new SDRRecord()
            }
        case RecordType.REC_TYPE_2:
            switch (sub) {
                case RecordSub.REC_SUB_10:
                    return new WIRRecord()
                case RecordSub.REC_SUB_20:
                    return new WRRRecord()
                case RecordSub.REC_SUB_30:
                    return new WCRRecord()
            }
        case RecordType.REC_TYPE_5:
            switch (sub) {
                case RecordSub.REC_SUB_10:
                    return new PIRRecord()
                case RecordSub.REC_SUB_20:
                    return new PRRRecord()
            }
        case RecordType.REC_TYPE_10:
            switch (sub) {
                case RecordSub.REC_SUB_30:
                    return new TSRRecord()
            }
        case RecordType.REC_TYPE_15:
            switch (sub) {
                case RecordSub.REC_SUB_10:
                    return new PTRRecord()
                case RecordSub.REC_SUB_15:
                    return new MPRRecord()
                case RecordSub.REC_SUB_20:
                    return new FTRRecord()
            }
        case RecordType.REC_TYPE_20:
            switch (sub) {
                case RecordSub.REC_SUB_10:
                    return new BPSRecord()
                case RecordSub.REC_SUB_20:
                    return new EPSRecord()
            }
        case RecordType.REC_TYPE_50:
            switch (sub) {
                case RecordSub.REC_SUB_10:
                    return new GDRRecord()
                case RecordSub.REC_SUB_30:
                    return new DTRRecord()
            }
        case RecordType.REC_TYPE_180:
            return new R180Record()
        case RecordType.REC_TYPE_181:
            return new R181Record()
        default:
            return new UKNRecord()
            // throw 
    }
}
