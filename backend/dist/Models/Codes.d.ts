import { Model } from "sequelize";
export declare class Codes extends Model {
    id: number;
    name: string;
    key: string;
    cryServer: string;
    fgsServer: string;
    status: boolean;
    type: number;
}
