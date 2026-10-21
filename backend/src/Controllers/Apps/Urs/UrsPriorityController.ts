import type { Request, Response } from "express";
import { Machine } from "../../../Models/Machine";
import { DBConfig, TenantConnection } from "../../../config/TenantConnection";
import { Codes } from "../../../Models/Codes";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { decrypt } from "../../../Utils/crypto";
import { formatDate, formatDateNow, normalizes, withTimeout } from "../../../Utils/Gnr";
import { PlanController } from "../../PlanController";
import { Plants } from "../../../Models/Index";
import { Smhcas } from "../../../Models/SMHCAS";
import { UrsPriority, UrsRequestsFolio } from "../../../Models/URS/UrsIndex";
import { io } from "../../../server";

export class UrsPriorityController {
    static Index: any = async (req: Request, res: Response) => {
        const priority = await UrsPriority.findAll({
            where:[{
                Level:{
                    [Op.gt]:0
                }
            }]
        })
        return res.json(priority)
    }
    
}