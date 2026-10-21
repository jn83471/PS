"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsPermision = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class AppsPermision extends sequelize_1.Model {
}
exports.AppsPermision = AppsPermision;
AppsPermision.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    AppsId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    KEY: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: db_1.sequelize,
    modelName: "AppsPermision"
});
//# sourceMappingURL=AppsPermision.js.map