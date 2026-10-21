import { Model } from "sequelize";
export declare class UserHasPermisions extends Model {
    id: number;
    AppsPermisionId: number;
    UserId: number | null;
}
