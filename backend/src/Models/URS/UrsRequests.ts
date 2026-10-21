import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import { Codes } from "../Codes";
import { UrsRequestScannHistory } from "./UrsRequestScannHistory";

export class UrsRequests extends Model {
    declare id: number;
    declare UrsRequestsFolioId: number;
    declare CodeId: number;
    declare PartNumber: string;
    declare CustomerPartNumber: string;
    declare Customer: string;
    declare Qty: number;
    declare Scann?: number;
    declare Reason: number;
    declare Process: string;
    declare UrsPriorityId: number;
    declare Codes?:Codes;
    declare UrsRequestScannHistory?: UrsRequestScannHistory[]

}

UrsRequests.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        UrsRequestsFolioId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CodeId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        PartNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CustomerPartNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Customer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Scann: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        Reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Process: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:0
        },
        ProposedDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        UrsPriorityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "UrsRequests",
        tableName: "UrsRequests"
    }
);

