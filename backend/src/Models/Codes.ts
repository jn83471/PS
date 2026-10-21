import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Machine } from "./Machine";

export class Codes extends Model {
    declare id: number;
    declare name: string;
    declare key:string;
    declare cryServer:string;
    declare fgsServer:string;
    declare status: boolean;
    declare type: number; //1 ighs 2 acs
}

Codes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cryServer:{
            type: DataTypes.STRING,
            allowNull: true
        },
        fgsServer:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: ''
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        type: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
        }
    },
    {
        sequelize,
        modelName: "Codes"
    }
);
