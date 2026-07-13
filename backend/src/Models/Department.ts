import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Departament extends Model {
    declare id: number;
    declare name: string;
    declare status: boolean;
}

Departament.init(
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
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    },
    {
        sequelize,
        modelName: "Departament"
    }
);
