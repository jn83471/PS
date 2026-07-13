import type { Request, Response } from "express";
import { Plants } from "../Models/Plants";
import { io } from "../server";
import { Json } from "sequelize/lib/utils";
import { Codes } from "../Models/Index";
import { encrypt } from "../Utils/crypto";
import path from "node:path";
import { Plans } from "../Models/Plan";
import XLSX from 'xlsx'
import { Smhcas } from "../Models/SMHCAS";
import { Op } from "sequelize";

export class PlanController {
    static Index: any = async (req: Request, res: Response) => {
        const plan = await Plans.findAll()
        return res.json(plan)
    }
    static Plan: any = async (req: Request, res: Response) => {
        const machines = []
        if (req.User.PlantId != null) {

        }
        const { fecha } = req.body
        const dt = new Date(fecha)

        const inicioSiguienteMes = new Date(dt);
        inicioSiguienteMes.setMonth(inicioSiguienteMes.getMonth() + 1);

        const workbook = XLSX.read(req.file.buffer, {
            type: 'buffer'
        });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const datos = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            defval: '' // evita undefined en celdas vacías
        });
        const resultado = [];
        for (let i = 6; i < datos.length; i++) {

            const filaActual = datos[i];

            const registro = {};

            for (let j = 0; j <= 40; j++) {

                registro[`col${j}`] = filaActual[j];

            }

            resultado.push(registro);

        }
        const smhcas = await Smhcas.findAll()
        const smh = []
        for (let i = 0; i < resultado.length; i++) {
            if (smh.find(x => x.ShortPart == resultado[i]["col8"]) == null && smhcas.find(x => x.ShortPart == resultado[i]["col8"]) == null) {
                smh.push({
                    ShortPart: resultado[i]["col8"],
                    Kmh: resultado[i]["col9"]
                })
            }
        }
        await Smhcas.bulkCreate(smh)

        const plan = await Plans.findAll({
            where: {
                createdAt: {
                    [Op.gte]: dt,
                    [Op.lt]: inicioSiguienteMes
                }
            }
        })
        const pl = []
        for (let i = 0; i < resultado.length; i++) {
            /*Capacity: number; 
    declare Line: string; 
    declare Program: string; 
    declare Shift: string; 
    declare PartNumber: string; 
    declare Customer: string; 
    declare LevenDesign: string; 
    declare Shortpart*/
            if (pl.find(x => x.machine == resultado[i]["col0"] && x.machine == resultado[i]["col1"] &&
                x.Program == resultado[i]["col3"] && x.Shift == resultado[i]["col4"] && x.PartNumber == resultado[i]["col5"] &&
                x.Customer == resultado[i]["col6"] && x.LevenDesign == resultado[i]["col7"] && x.Shortpart == resultado[i]["col8"]) == null &&
                plan.find(x => x.machine == resultado[i]["col0"] && x.machine == resultado[i]["col1"] &&
                    x.Program == resultado[i]["col3"] && x.Shift == resultado[i]["col4"] && x.PartNumber == resultado[i]["col5"] &&
                    x.Customer == resultado[i]["col6"] && x.LevenDesign == resultado[i]["col7"] && x.Shortpart == resultado[i]["col8"]) == null) {
                pl.push({
                    machine: resultado[i]["col0"],
                    Capacity: resultado[i]["col1"],
                    Line: resultado[i]["col2"],
                    Program: resultado[i]["col3"],
                    Shift: resultado[i]["col4"],
                    PartNumber: resultado[i]["col5"],
                    Customer: resultado[i]["col6"],
                    LevenDesign: resultado[i]["col7"],
                    Shortpart: resultado[i]["col8"],
                    Kmh: resultado[i]["col9"],
                    d1: resultado[i]["col10"] ?? 0,
                    d2: resultado[i]["col11"] ?? 0,
                    d3: resultado[i]["col12"] ?? 0,
                    d4: resultado[i]["col13"] ?? 0,
                    d5: resultado[i]["col14"] ?? 0,
                    d6: resultado[i]["col15"] ?? 0,
                    d7: resultado[i]["col16"] ?? 0,
                    d8: resultado[i]["col17"] ?? 0,
                    d9: resultado[i]["col18"] ?? 0,
                    d10: resultado[i]["col19"] ?? 0,
                    d11: resultado[i]["col20"] ?? 0,
                    d12: resultado[i]["col21"] ?? 0,
                    d13: resultado[i]["col22"] ?? 0,
                    d14: resultado[i]["col23"] ?? 0,
                    d15: resultado[i]["col24"] ?? 0,
                    d16: resultado[i]["col25"] ?? 0,
                    d17: resultado[i]["col26"] ?? 0,
                    d18: resultado[i]["col27"] ?? 0,
                    d19: resultado[i]["col28"] ?? 0,
                    d20: resultado[i]["col29"] ?? 0,
                    d21: resultado[i]["col30"] ?? 0,
                    d22: resultado[i]["col31"] ?? 0,
                    d23: resultado[i]["col32"] ?? 0,
                    d24: resultado[i]["col33"] ?? 0,
                    d25: resultado[i]["col34"] ?? 0,
                    d26: resultado[i]["col35"] ?? 0,
                    d27: resultado[i]["col36"] ?? 0,
                    d28: resultado[i]["col37"] ?? 0,
                    d29: resultado[i]["col38"] ?? 0,
                    d30: resultado[i]["col39"] ?? 0,
                    d31: resultado[i]["col40"] ?? 0,
                })
            }
        }
        await Plans.bulkCreate(pl)


        res.json({
            resultado,
            fecha
        });
    }
}
