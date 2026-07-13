import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Rols extends Model {
    declare id: number;
    declare name: string;
    declare display: string;
    declare ShowGenaralReports: boolean;
    declare CreateUsers: boolean;
    declare ResetPasswords: boolean;
    declare changeLayoutMachines: boolean;
    declare CreatePlants: boolean;
    declare CreateClients: boolean;
    declare CreatePlans: boolean;
    declare CreateCodes: boolean;
    declare UseDiferentDepartments: boolean;
    declare Level: number;
    declare status: boolean;
}

Rols.init(
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
        display: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ShowGenaralReports: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        CreateUsers: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        ResetPasswords: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        changeLayoutMachines: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        CreatePlants: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        CreateClients: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        CreatePlans: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        CreateCodes: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        UseDiferentDepartments: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        Level: {
            type: DataTypes.TINYINT,
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
        modelName: "Rols"
    }
);