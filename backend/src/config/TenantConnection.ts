import { Sequelize } from "sequelize";

export type DBConfig = {
    name: string;
    host: string;
    database: string;
    username: string;
    password: string;
};

const connections = new Map<string, Sequelize>();

export const TenantConnection = (config: DBConfig) => {
    if (!connections.has(config.host)) {
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

    return connections.get(config.name)!;
};
