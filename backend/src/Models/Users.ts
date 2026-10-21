import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Plants } from "./Plants";
import { Rols } from "./Rols";
import { Departament } from "./Department";
import { UserHasPermisions } from "./UserHasPermisions";

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
    declare UserHasPermisions?: UserHasPermisions[]|null;
    declare TimeZone: number;
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
        UrsProcessId:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        PlantId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Lang:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue:1
        },
        TimeZone:{
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue:1
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


/*Lang:{
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },*/
