import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Plants } from "./Plants";
import { Rols } from "./Rols";
import { Departament } from "./Department";

export class Users extends Model {
    declare id: number;
    declare Name: string;
    declare Email: string;
    declare Password: string;
    declare RolId: number;
    declare DepartmentId: number;
    declare PlantId?: number | null;
    declare status: boolean;
    declare Plants?: Plants;
    declare Rols?: Rols;
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        RolId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        DepartmentId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        PlantId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }

    },
    {
        sequelize,
        modelName: "Users"
    }
);

Users.belongsTo(Plants, { foreignKey: "PlantId", as: "Plants" });
Users.belongsTo(Rols, { foreignKey: "RolId", as: "Rols" });
Users.belongsTo(Departament, { foreignKey: "DepartmentId", as: "Departament" });

