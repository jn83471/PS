import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Codes } from "./Codes";
import { Machine } from "./Machine";

export class Apps extends Model {
    declare id: number;
    declare KEY: string;
    declare status: boolean;
}

Apps.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        KEY: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: true
        },
        
    },
    {
        sequelize,
        modelName: "Apps"
    }
);