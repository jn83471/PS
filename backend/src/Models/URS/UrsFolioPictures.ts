import { DataTypes, Model } from "sequelize";
import { UrsRequestsFolio } from "./UrsRequestsFolio";
import { UrsProcess } from "./UrsProcess";
import { sequelize } from "../../config/db";

export class UrsFolioPictures extends Model {
    declare id: number;
    declare UrsRequestsFolioId: number;
    declare Verify: number;
    declare UrsProcessId: number;
    declare Name: string;

    declare UrsRequestsFolio?: UrsRequestsFolio;
    declare UrsProcess?: UrsProcess;
}

UrsFolioPictures.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UrsRequestsFolioId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Verify: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        UrsProcessId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "UrsFolioPictures",
        tableName: "UrsFolioPictures"
    }
);