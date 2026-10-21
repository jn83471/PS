import { Model } from "sequelize";
export declare class Machine extends Model {
    id: number;
    PlantId: number;
    name: string;
    machineCode: string;
    status: boolean;
}
