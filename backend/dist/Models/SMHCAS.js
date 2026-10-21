"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Smhcas = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Smhcas extends sequelize_1.Model {
}
exports.Smhcas = Smhcas;
Smhcas.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ShortPart: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Kmh: {
        type: sequelize_1.DataTypes.DECIMAL(18, 6),
        allowNull: false
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Smhcas"
});
//# sourceMappingURL=SMHCAS.js.map