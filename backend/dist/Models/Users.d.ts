import { Model } from "sequelize";
import { Plants } from "./Plants";
import { Rols } from "./Rols";
import { UserHasPermisions } from "./UserHasPermisions";
export declare class Users extends Model {
    id: number;
    Name: string;
    Email: string;
    Password: string;
    RolId: number;
    DepartmentId: number;
    PlantId?: number | null;
    status: boolean;
    Plants?: Plants;
    Rols?: Rols;
    UserHasPermisions?: UserHasPermisions[] | null;
}
