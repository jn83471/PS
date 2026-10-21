import { Model } from "sequelize";
import { Machine } from "./Machine";
export declare class Clients extends Model {
    id: number;
    name: string;
    status: boolean;
    defaultCode: string;
    Machine?: Machine[];
    MONTH?: number;
}
