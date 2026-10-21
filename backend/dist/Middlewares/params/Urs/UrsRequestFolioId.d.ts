import { UrsRequestsFolio } from '../../../Models/URS/UrsRequestsFolio';
declare global {
    namespace Express {
        interface Request {
            UrsRequestsFolio: UrsRequestsFolio;
        }
    }
}
export declare const validateUrsRequestFolioId: any;
