import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class EmailsToSend extends Model {
    declare id: number;
    declare Key: string;
    declare Emails: string;
}

EmailsToSend.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        Emails: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "EmailsToSend",
        tableName:"EmailsToSend"
    }
);
