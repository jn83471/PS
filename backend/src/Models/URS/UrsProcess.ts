import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";

export class UrsProcess extends Model {
    declare id: number;
    declare Qty: number;
    declare Verify: number;
    declare Process: number;
}

UrsProcess.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        Name: {
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
        modelName: "UrsProcess",
        tableName: "UrsProcess"
    }
);

