"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Users extends sequelize_1.Model {
}
exports.Users = Users;
Users.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    RolId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    DepartmentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    PlantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize: db_1.sequelize,
    modelName: "Users"
});
//# sourceMappingURL=Users.js.map