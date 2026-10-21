import { Model } from "sequelize";
import { Machine } from "./Machine";
export declare class Plants extends Model {
    id: number;
    name: string;
    status: boolean;
    defaultCode: string;
    type: number;
    Machine?: Machine[];
    MONTH?: number;
}
