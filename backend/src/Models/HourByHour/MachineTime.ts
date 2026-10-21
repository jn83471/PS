import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";

export class MachineTime extends Model {
    declare id: number;
    declare MachinesId: number;

    declare h7: number;
    declare h8: number;
    declare h9: number;
    declare h10: number;
    declare h11: number;
    declare h12: number;
    declare h13: number;
    declare h14: number;
    declare h15: number;
    declare h16: number;
    declare h17: number;
    declare h18: number;
    declare h19: number;
    declare h20: number;
    declare h21: number;
    declare h22: number;
    declare h23: number;
    declare h0: number;
    declare h1: number;
    declare h2: number;
    declare h3: number;
    declare h4: number;
    declare h5: number;
    declare h6: number;
}

MachineTime.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        MachinesId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },

        h7: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h8: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h9: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h10: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h11: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h12: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h13: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h14: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h15: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h16: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h17: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h18: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h19: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h20: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h21: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h22: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h23: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },

        h0: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h1: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h2: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h3: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h4: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h5: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 },
        h6: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 60 }
    },
    {
        sequelize,
        timestamps: true,
        modelName: "MachineTime",
        tableName: "MachineTime"
    }
);
