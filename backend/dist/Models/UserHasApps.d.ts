import { Model } from "sequelize";
export declare class UserHasApps extends Model {
    id: number;
    AppsId: number;
    UserId: number | null;
}
