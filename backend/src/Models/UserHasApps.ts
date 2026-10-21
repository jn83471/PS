import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Plants } from "./Plants";
import { Rols } from "./Rols";
import { Departament } from "./Department";
import { Users } from "./Users";
import { Apps } from "./Apps";

export class UserHasApps extends Model {
    declare id: number;
    declare AppsId: number;
    declare UserId: number | null;
}

UserHasApps.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        AppsId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: "UserHasApps"
    }
);

