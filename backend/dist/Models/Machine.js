"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Machine = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Machine extends sequelize_1.Model {
}
exports.Machine = Machine;
Machine.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    PlantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    CodesId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    machineCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ClientsId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Machine"
});
//# sourceMappingURL=Machine.js.map