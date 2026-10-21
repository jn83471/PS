import { Sequelize } from "sequelize";

export type DBConfig = {
    name: string;
    host: string;
    database: string;
    username: string;
    password: string;
};

const connections = new Map<string, Sequelize>();

const createConnection = (config: DBConfig): Sequelize => {

    const [host, instanceName] = config.host.split("\\");

    return new Sequelize(
        config.database,
        config.username,
        config.password,
        {
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
        }
    );
};

export const TenantConnection = async (
    config: DBConfig
): Promise<Sequelize> => {

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

    } catch (error) {

        console.log(`[DB] Reconectando: ${key}`);

        connections.delete(key);

        sequelize = createConnection(config);

        await sequelize.authenticate();

        connections.set(key, sequelize);
    }

    return sequelize;
};
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

