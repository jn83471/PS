import { Users } from '../../Models/Users';
declare global {
    namespace Express {
        interface Request {
            User?: Users;
        }
    }
}
export declare const autenticate: any;
