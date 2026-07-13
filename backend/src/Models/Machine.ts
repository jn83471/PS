import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Plants } from "./Plants";
import { Codes } from "./Codes";

export class Machine extends Model {
    declare id: number;
    declare PlantId: number;
    declare name: string;
    declare machineCode: string;
    declare status: boolean;
}

Machine.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PlantId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        CodesId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        machineCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ClientsId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    },
    {
        sequelize,
        modelName: "Machine"
    }
);
