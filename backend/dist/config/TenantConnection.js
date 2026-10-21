"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantConnection = void 0;
const sequelize_1 = require("sequelize");
const connections = new Map();
const createConnection = (config) => {
    const [host, instanceName] = config.host.split("\\");
    return new sequelize_1.Sequelize(config.database, config.username, config.password, {
        host,
        dialect: "mssql",
        dialectOptions: {
            options: {
                instanceName,
                encrypt: false,
                trustServerCertificate: true
            }
        },
        pool: {
            max: 15,
            min: 0,
            idle: 10000,
            acquire: 30000
        },
        logging: false
    });
};
const TenantConnection = async (config) => {
    // Clave única por servidor y base de datos
    const key = `${config.host}_${config.database}`;
    let sequelize = connections.get(key);
    // Crear conexión si no existe
    if (!sequelize) {
        sequelize = createConnection(config);
        await sequelize.authenticate();
        connections.set(key, sequelize);
        console.log(`[DB] Nueva conexión creada: ${key}`);
    }
    // Validar que sigue viva
    try {
        await sequelize.authenticate();
    }
    catch (error) {
        console.log(`[DB] Reconectando: ${key}`);
        connections.delete(key);
        sequelize = createConnection(config);
        await sequelize.authenticate();
        connections.set(key, sequelize);
    }
    return sequelize;
};
exports.TenantConnection = TenantConnection;
/*const key = `${config.host}_${config.database}`;
if (!connections.has(key)) {
    if (config.host.split('\\').length == 1) {
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            {
                host: config.host,
                dialect: "mssql",
                dialectOptions: {
                    options: {
                        encrypt: false, // required for Azure SQL
                        trustServerCertificate: true // for local dev
                    }
                },
                pool: {
                    max: 15,
                    min: 0,
                    idle: 10000
                }
            }
        );

        connections.set(config.name, sequelize);
    }
    else {
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            {
                host: config.host.split('\\')[0],
                dialect: "mssql",
                dialectOptions: {
                    options: {
                        instanceName:config.host.split('\\')[1],
                        encrypt: false, // required for Azure SQL
                        trustServerCertificate: true // for local dev
                    }
                },
                pool: {
                    max: 15,
                    min: 0,
                    idle: 10000
                }
            }
        );

        connections.set(config.name, sequelize);
    }


}

return connections.get(config.name)!;*/
//# sourceMappingURL=TenantConnection.js.map