import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Machine } from "./Machine";

export class Smhcas extends Model {
    declare id: number;
    declare ShortPart: string;
    declare Kmh: number;

}

Smhcas.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ShortPart: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Kmh: {
            type: DataTypes.DECIMAL(18, 6),
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "Smhcas"
    }
);
