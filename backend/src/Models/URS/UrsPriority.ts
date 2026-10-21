import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import { PriorityHasProcess } from "./PriorityHasProcess";

export class UrsPriority extends Model {
    declare id: number;
    declare Qty: number;
    declare Verify: number;
    declare Process: number;
    declare PriorityHasProcess?:PriorityHasProcess[]
}

UrsPriority.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Level: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "UrsPriority",
        tableName: "UrsPriority"
    }
);

