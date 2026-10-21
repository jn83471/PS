import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("", "", "", {
    host: "",
    dialect: "mssql",
    dialectOptions: {
        options: {
            encrypt: false, // required for Azure SQL
            trustServerCertificate: true // for local dev
        }
    }

});