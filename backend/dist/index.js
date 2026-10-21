"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./config/db");
const server_1 = __importDefault(require("./server"));
const port = process.env.PORT || 4000;
(async () => {
    try {
        //await sequelize.sync(); // cuando quiera generar las tablas
        await db_1.sequelize.authenticate();
        console.log("Conexión establecida con SQL Server");
        server_1.default.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("Error al conectar:", error);
    }
})();
//# sourceMappingURL=index.js.map