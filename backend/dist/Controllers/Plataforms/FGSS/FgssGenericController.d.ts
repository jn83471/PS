import { Sequelize } from "sequelize";
export declare class FgssGenericController {
    static Index: any;
    static ParNumberList: any;
    static ParNumberListCustomers: any;
    static getReportNuParts: (sequelize: Sequelize, code: string) => Promise<{
        sews_part_no: string;
    }[]>;
    static getReportNuPartsCustomers: (sequelize: Sequelize, code: string, nuPart: string) => Promise<{
        cust_part_no: string;
    }[]>;
}
