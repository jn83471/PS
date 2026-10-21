import type { Request, Response } from "express";
import { Sequelize } from "sequelize";
export declare class PlanController {
    static Index: any;
    static Plan: any;
    static PlanView: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static GetAllPiecesByMonth: (sequelize: Sequelize, fecha: Date, shift: number) => Promise<{
        line_c: string;
        DAY: number;
        SHIFT: number;
        PROD: number;
    }[]>;
}
