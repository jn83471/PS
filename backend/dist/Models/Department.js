"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Departament = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Departament extends sequelize_1.Model {
}
exports.Departament = Departament;
Departament.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Departament"
});
//# sourceMappingURL=Department.js.map