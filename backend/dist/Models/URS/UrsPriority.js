"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrsPriority = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class UrsPriority extends sequelize_1.Model {
}
exports.UrsPriority = UrsPriority;
UrsPriority.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Level: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false
    }
}, {
    sequelize: db_1.sequelize,
    modelName: "UrsPriority",
    tableName: "UrsPriority"
});
//# sourceMappingURL=UrsPriority.js.map