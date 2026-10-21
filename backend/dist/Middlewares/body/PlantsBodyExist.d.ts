import { Plants } from '../../Models/Plants';
declare global {
    namespace Express {
        interface Request {
            plants: Plants;
        }
    }
}
export declare const PlantsBodyExist: any;
