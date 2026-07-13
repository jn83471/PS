import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Codes } from "./Codes";
import { Machine } from "./Machine";

export class Plants extends Model {
    declare id: number;
    declare name: string;
    declare status: boolean;
    declare defaultCode: string;
    declare type: number; //1 ighs 2 acs
// ? relación (NO columna en BD)
    declare Machine?: Machine[];
    declare MONTH?: number;

}

Plants.init(
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
        type: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        APPKEY: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    },
    {
        sequelize,
        modelName: "Plants"
    }
);

Plants.belongsTo(Codes, { foreignKey: "defaultCode", as: "Codes" });
