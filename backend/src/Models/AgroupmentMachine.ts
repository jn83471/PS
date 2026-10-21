import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Codes } from "./Codes";
import { Machine } from "./Machine";

export class AgroupmentMachine extends Model {
    declare id: number;
    declare machine: string;
    declare machineToChange: string;
    declare Decription: string;
}

AgroupmentMachine.init(
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
        machineToChange: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Decription: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "AgroupmentMachine"
    }
);

AgroupmentMachine.belongsTo(Codes, { foreignKey: "defaultCode", as: "Codes" });
