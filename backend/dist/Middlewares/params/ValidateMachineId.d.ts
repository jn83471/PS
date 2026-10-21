import { Machine } from '../../Models/Machine';
declare global {
    namespace Express {
        interface Request {
            machines: Machine;
        }
    }
}
export declare const validateMachineExcist: any;
