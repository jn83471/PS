"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clients = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Codes_1 = require("./Codes");
class Clients extends sequelize_1.Model {
}
exports.Clients = Clients;
Clients.init({
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
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Clients"
});
Clients.belongsTo(Codes_1.Codes, { foreignKey: "defaultCode", as: "Codes" });
//# sourceMappingURL=Client.js.map