"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plans = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Plans extends sequelize_1.Model {
}
exports.Plans = Plans;
const dias = {};
for (let i = 1; i <= 31; i++) {
    dias[`d${i}`] = {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    };
}
Plans.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    machine: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Capacity: {
        type: sequelize_1.DataTypes.DECIMAL(18, 6),
        allowNull: false,
        defaultValue: 0
    },
    Line: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Program: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Shift: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    PartNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Customer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    LevenDesign: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Shortpart: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Kmh: {
        type: sequelize_1.DataTypes.DECIMAL(18, 6),
        allowNull: false
    },
    d1: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ...dias,
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Plans"
});
//# sourceMappingURL=Plan.js.map