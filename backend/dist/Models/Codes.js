"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Codes = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Codes extends sequelize_1.Model {
}
exports.Codes = Codes;
Codes.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    key: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cryServer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    fgsServer: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: ''
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    type: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    }
}, {
    sequelize: db_1.sequelize,
    modelName: "Codes"
});
//# sourceMappingURL=Codes.js.map