import type { Request, Response } from "express";
import { Plants } from "../Models/Plants";
import { io } from "../server";
import { Json } from "sequelize/lib/utils";
import { Codes } from "../Models/Index";
import { encrypt } from "../Utils/crypto";
import path from "node:path";

export class DownloadController {
    static Plan: any = async (req: Request, res: Response) => {

        const filePath = path.join(__dirname, '../archives/PlanFormat.xlsx')

        // Validación básica (puedes agregar JWT o sesión)
        /*if (!req.headers.authorization) {
            return res.status(401).send('No autorizado');
        }*/

        res.download(filePath, 'Plan.pdf', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al descargar');
            }
        });

    }
}