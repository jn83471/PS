import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import { Codes } from "../Codes";

export class UrsRequestScannHistory extends Model {
    declare id: number;
    declare UrsRequestsId: number;
    declare UrsProcessId: number;
    declare Box: string;
    declare Qty: number
}

UrsRequestScannHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        UrsRequestsId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        UrsProcessId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Box: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Qty: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "UrsRequestScannHistory",
        tableName: "UrsRequestScannHistory"
    }
);

