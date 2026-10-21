"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apps = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Apps extends sequelize_1.Model {
}
exports.Apps = Apps;
Apps.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    KEY: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: true
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Apps"
});
//# sourceMappingURL=Apps.js.map