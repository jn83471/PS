"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rols = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Rols extends sequelize_1.Model {
}
exports.Rols = Rols;
Rols.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    display: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ShowGenaralReports: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    CreateUsers: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    ResetPasswords: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    changeLayoutMachines: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    CreatePlants: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    CreateClients: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    CreatePlans: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    CreateCodes: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    UseDiferentDepartments: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    Level: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Rols"
});
//# sourceMappingURL=Rols.js.map