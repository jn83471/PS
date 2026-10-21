"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plants = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Codes_1 = require("./Codes");
class Plants extends sequelize_1.Model {
}
exports.Plants = Plants;
Plants.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    defaultCode: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    APPKEY: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    }
}, {
    sequelize: db_1.sequelize,
    modelName: "Plants"
});
Plants.belongsTo(Codes_1.Codes, { foreignKey: "defaultCode", as: "Codes" });
//# sourceMappingURL=Plants.js.map