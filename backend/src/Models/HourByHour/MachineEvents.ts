import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";

export class MachineEvents extends Model {
    declare id: number;
    declare MachinesId: number;
    declare Type: number;
    declare Description: string;
    declare Start: string;
    declare End: string;
}

MachineEvents.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        MachinesId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        Type: {
            type: DataTypes.TINYINT,
            allowNull: false
        },

        Description: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Start: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        End: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: "MachineEvents",
        tableName: "MachineEvents"
    }
);

