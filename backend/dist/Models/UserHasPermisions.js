"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHasPermisions = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class UserHasPermisions extends sequelize_1.Model {
}
exports.UserHasPermisions = UserHasPermisions;
UserHasPermisions.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    AppsPermisionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: db_1.sequelize,
    modelName: "UserHasPermisions"
});
//# sourceMappingURL=UserHasPermisions.js.map