import { Sequelize } from "sequelize";
export type DBConfig = {
    name: string;
    host: string;
    database: string;
    username: string;
    password: string;
};
export declare const TenantConnection: (config: DBConfig) => Promise<Sequelize>;
