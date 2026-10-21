import { Sequelize } from "sequelize";
export declare class LineMonitorController {
    static Index: any;
    static GetKmh: (sequelize: Sequelize, fecha: Date, shift: number) => Promise<{
        line_c: string;
        DAY: number;
        SHIFT: number;
        PROD: number;
    }[]>;
}
