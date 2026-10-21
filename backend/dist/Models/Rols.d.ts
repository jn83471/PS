import { Model } from "sequelize";
export declare class Rols extends Model {
    id: number;
    name: string;
    display: string;
    ShowGenaralReports: boolean;
    CreateUsers: boolean;
    ResetPasswords: boolean;
    changeLayoutMachines: boolean;
    CreatePlants: boolean;
    CreateClients: boolean;
    CreatePlans: boolean;
    CreateCodes: boolean;
    UseDiferentDepartments: boolean;
    Level: number;
    status: boolean;
}
