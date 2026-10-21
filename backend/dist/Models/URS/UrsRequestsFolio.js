"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrsRequestsFolio = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class UrsRequestsFolio extends sequelize_1.Model {
}
exports.UrsRequestsFolio = UrsRequestsFolio;
UrsRequestsFolio.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Qty: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    Verify: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    motive: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    RequestUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    AprovedUserBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FinishUserBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    RecibedUserBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    Process: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    ProposedDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    DeliveryDay: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    ClosedDay: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    CancelDay: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    LastProcessDay: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    UrsPriorityId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "UrsRequestsFolio",
    tableName: "UrsRequestsFolio"
});
//# sourceMappingURL=UrsRequestsFolio.js.map