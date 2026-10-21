import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Plants } from "./Plants";
import { Rols } from "./Rols";
import { Departament } from "./Department";
import { Users } from "./Users";
import { Apps } from "./Apps";

export class AppsPermision extends Model {
    declare id: number;
    declare AppsId: number;
    declare KEY: string ;
}

AppsPermision.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        AppsId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        KEY: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: "AppsPermision"
    }
);

