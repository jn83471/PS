import { Codes } from '../../Models/Codes';
declare global {
    namespace Express {
        interface Request {
            codes: Codes;
        }
    }
}
export declare const CodeBodyExist: any;
