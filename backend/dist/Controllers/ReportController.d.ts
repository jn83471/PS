import { Sequelize } from "sequelize";
export declare class ReportController {
    static Report: any;
    static IPD: any;
    static IPDByPlant: any;
    static normalizes: (text: string) => string;
    static getReportACS: (sequelize: Sequelize) => Promise<{
        line_c: string;
        DAY: number;
        SHIFT: number;
        PROD: number;
    }[]>;
    static getReportAllACS: (sequelize: Sequelize) => Promise<{
        line_c: string;
        DAY: number;
        SHIFT: number;
        PROD: number;
    }[]>;
    static getReportAllByYearACS: (sequelize: Sequelize) => Promise<{
        line_c: string;
        DAY: number;
        SHIFT: number;
        PROD: number;
    }[]>;
    static getReportIGHS: (sequelize: Sequelize) => Promise<{
        line_c: string;
        DAY: number;
        SHIFT: number;
        PROD: number;
    }[]>;
    static getReportAllIGHS: (sequelize: Sequelize) => Promise<{
        line_c: string;
        DAY: number;
        SHIFT: number;
        PROD: number;
    }[]>;
    static getReportAllByYearIGHS: (sequelize: Sequelize) => Promise<{
        line_c: string;
        DAY: number;
        SHIFT: number;
        PROD: number;
    }[]>;
    static withTimeout: (promise: Promise<any>, ms: number) => Promise<any>;
}
