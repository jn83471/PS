import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Plants } from "./Plants";
import { Codes } from "./Codes";
import { number } from "zod";

export class Plans extends Model {
    declare id: number; 
    declare machine: string; 
    declare Capacity: number; 
    declare Line: string; 
    declare Program: string; 
    declare Shift: string; 
    declare PartNumber: string; 
    declare Customer: string; 
    declare LevenDesign: string; 
    declare Shortpart: string; 
    declare Kmh: number;
    declare d1:number; 
    declare d2:number; 
    declare d3:number; 
    declare d4:number; 
    declare d5:number; 
    declare d6:number; 
    declare d7:number; 
    declare d8:number; 
    declare d9:number; 
    declare d10:number; 
    declare d11:number; 
    declare d12:number; 
    declare d13:number; 
    declare d14:number; 
    declare d15:number; 
    declare d16:number; 
    declare d17:number; 
    declare d18:number; 
    declare d19:number; 
    declare d20:number; 
    declare d21:number; 
    declare d22:number; 
    declare d23:number; 
    declare d24:number; 
    declare d25:number; 
    declare d26:number; 
    declare d27:number; 
    declare d28:number; 
    declare d29:number; 
    declare d30:number; 
    declare d31:number; 
}


const dias = {};

for (let i = 1; i <= 31; i++) {
    dias[`d${i}`] = {
        type: DataTypes.INTEGER,
        allowNull: false
    };
}


Plans.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        machine: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Capacity: {
            type: DataTypes.DECIMAL(18, 6),
            allowNull: false,
            defaultValue:0
        },
        Line: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Program: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Shift: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PartNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Customer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LevenDesign: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Shortpart: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Kmh: {
            type: DataTypes.DECIMAL(18, 6),
            allowNull: false
        },
        d1: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ...dias,

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    },
    {
        sequelize,
        modelName: "Plans"
    }
);
