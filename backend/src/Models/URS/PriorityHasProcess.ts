import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";

export class PriorityHasProcess extends Model {
    declare id: number;
    declare UrsPriorityId: number;
    declare UrsProcessId: number;
    declare Level: number;
}

PriorityHasProcess.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        UrsPriorityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        UrsProcessId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Level: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    },
    {
        timestamps:false,
        sequelize,
        modelName: "PriorityHasProcess",
        tableName: "PriorityHasProcess"
    }
);

