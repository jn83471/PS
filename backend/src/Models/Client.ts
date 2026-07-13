import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Codes } from "./Codes";
import { Machine } from "./Machine";

export class Clients extends Model {
    declare id: number;
    declare name: string;
    declare status: boolean;
    declare defaultCode: string;

    declare Machine?: Machine[];
    declare MONTH?: number;
}

Clients.init(
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
        defaultCode: {
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
        modelName: "Clients"
    }
);

Clients.belongsTo(Codes, { foreignKey: "defaultCode", as: "Codes" });
