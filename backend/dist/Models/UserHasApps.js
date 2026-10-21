"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHasApps = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class UserHasApps extends sequelize_1.Model {
}
exports.UserHasApps = UserHasApps;
UserHasApps.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    AppsId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: db_1.sequelize,
    modelName: "UserHasApps"
});
//# sourceMappingURL=UserHasApps.js.map