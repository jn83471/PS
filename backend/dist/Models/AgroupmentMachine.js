"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgroupmentMachine = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Codes_1 = require("./Codes");
class AgroupmentMachine extends sequelize_1.Model {
}
exports.AgroupmentMachine = AgroupmentMachine;
AgroupmentMachine.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    machine: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    machineToChange: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    Decription: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "AgroupmentMachine"
});
AgroupmentMachine.belongsTo(Codes_1.Codes, { foreignKey: "defaultCode", as: "Codes" });
//# sourceMappingURL=AgroupmentMachine.js.map