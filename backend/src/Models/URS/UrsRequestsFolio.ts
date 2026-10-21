import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import { UrsPriority } from "./UrsPriority";

export class UrsRequestsFolio extends Model {
    declare id: number;
    declare Qty: number;
    declare Verify: number;
    declare motive: string;
    declare RequestUserId: number;
    declare AprovedUserBy?: number;
    declare FinishUserBy?: number;
    declare RecibedUserBy?: number;
    declare Process: number;
    declare ProposedDate: string;
    declare DeliveryDay: string;
    declare ClosedDay: string;
    declare CancelDay: string;
    declare LastProcessDay: string;
    declare UrsPriorityId: number;
    declare UrsPriority?: UrsPriority
    declare hrs: string;

}

UrsRequestsFolio.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        Qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        Verify: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        motive: {
            type: DataTypes.STRING,
            allowNull: true
        },
        RequestUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        AprovedUserBy: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        FinishUserBy: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        FinishUserSMTSBy: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        RecibedUserBy: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ClosedUserId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Process: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        ProposedDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        DeliveryDay: {
            type: DataTypes.DATE,
            allowNull: true
        },
        FinishUserSMTSDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        ClosedDay: {
            type: DataTypes.DATE,
            allowNull: true
        },
        CancelDay: {
            type: DataTypes.DATE,
            allowNull: true
        },
        LastProcessDay: {
            type: DataTypes.DATE,
            allowNull: true
        },
        UrsPriorityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        SMTSLastVerificationUser: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        SMTSLastVerification: {
            type: DataTypes.DATE,
            allowNull: true
        },
        hrs: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "UrsRequestsFolio",
        tableName: "UrsRequestsFolio"
    }
);

