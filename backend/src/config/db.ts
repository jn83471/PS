import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("TKE", "sa", "Atn54", {
    host: "172.30.190.47",
    dialect: "mssql",
    dialectOptions: {
        options: {
            encrypt: false, // required for Azure SQL
            trustServerCertificate: true // for local dev
        }
    }

});