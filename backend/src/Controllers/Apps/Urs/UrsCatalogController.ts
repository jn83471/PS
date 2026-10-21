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

export class UrsCatalogController {
    static Catalog: any = async (req: Request, res: Response) => {
        try {
            const codes = await Codes.findAll({
                where: {
                    status: true,
                }
            })
            const priority = await UrsPriority.findAll({
                where: [{
                    Level: {
                        [Op.gt]: 0
                    }
                }
                ]
            })
            return res.json({ permision: req.UserHasPermisions, codes, priority })
        } catch (error) {

        }

    }
}