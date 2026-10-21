"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize("TKE", "sa", "Atn54", {
    host: "172.30.190.47",
    dialect: "mssql",
    dialectOptions: {
        options: {
            encrypt: false, // required for Azure SQL
            trustServerCertificate: true // for local dev
        }
    }
});
//# sourceMappingURL=db.js.map