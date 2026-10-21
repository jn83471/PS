import { Clients } from '../../Models/Client';
declare global {
    namespace Express {
        interface Request {
            Client: Clients;
        }
    }
}
export declare const validateClientExcist: any;
