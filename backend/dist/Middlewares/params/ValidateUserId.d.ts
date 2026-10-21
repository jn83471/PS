import { Users } from '../../Models/Users';
declare global {
    namespace Express {
        interface Request {
            users: Users;
        }
    }
}
export declare const ValidateUserExcist: any;
