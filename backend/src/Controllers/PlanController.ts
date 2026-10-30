import type { Request, Response } from "express";
import { Machine, Plants } from "../Models/Index";
import { io } from "../server";
import { Json } from "sequelize/lib/utils";
import { Codes } from "../Models/Index";
import { encrypt } from "../Utils/crypto";
import path from "node:path";
import { Plans } from "../Models/Plan";
import XLSX from 'xlsx'
import { Smhcas } from "../Models/SMHCAS";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { DBConfig, TenantConnection } from "../config/TenantConnection";
import { decrypt } from "../Utils/crypto";
import { formatDate, normalizes, withTimeout } from "../Utils/Gnr";
import { Clients } from "../Models/Client";


export class PlanController {


    static Index: any = async (req: Request, res: Response) => {
        //const { fecha } = req.body || req.params
        const fecha = req.body?.fecha || req.query?.fecha;
        console.error("fecha: " + fecha)
        let [year, month, day] = fecha
            .split("-")
            .map(Number);
        day = 1

        const dt = new Date(year, month - 1, day);

        const inicioSiguienteMes = new Date(
            dt.getFullYear(),
            dt.getMonth() + 1,
            1
        );
        console.log(dt)
        console.log(inicioSiguienteMes)

        let machines = []
        if (req.User.PlantId == null) {
            const machine = await Machine.findAll({
                where: [
                    {
                        status: true,
                    }
                ]
            })
            machines = machine.map(row => row.machineCode);
        }
        else {
            const machine = await Machine.findAll({
                where: [
                    {
                        status: true,
                        PlantId: req.User?.PlantId
                    }
                ]
            })
            machines = machine.map(row => row.machineCode);
        }



        const plan = await Plans.findAll({
            where: {
                createdAt: {
                    [Op.gte]: dt,
                    [Op.lt]: inicioSiguienteMes
                },
                machine: {
                    [Op.in]: machines
                }
            }
        })
        return res.json(plan)
    }
    static Plan: any = async (req: Request, res: Response) => {
        try {
            let machines = []
            if (req.User.PlantId == null) {
                const machine = await Machine.findAll({
                    where: [
                        {
                            status: true,
                        }
                    ]
                })
                machines = machine.map(row => row.machineCode);
            }
            else {
                const machine = await Machine.findAll({
                    where: [
                        {
                            status: true,
                            PlantId: req.User?.PlantId
                        }
                    ]
                })
                machines = machine.map(row => row.machineCode);
            }
            const { fecha } = req.body
            let [year, month, day] = fecha
                .split("-")
                .map(Number);
            const dt = new Date(year, month - 1, 2);

            const inicioSiguienteMes = new Date(
                dt.getFullYear(),
                dt.getMonth() + 1,
                1
            );
            //inicioSiguienteMes.setDate(inicioSiguienteMes.getDate() + 1);

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
            const insert = new Date(dt)
            insert.setDate(insert.getDate() + 1)
            //return res.json({ plan, dt, inicioSiguienteMes })
            const pl = []
            for (let i = 0; i < resultado.length; i++) {

                if (!machines.includes(resultado[i]["col0"])) {
                    continue
                }


                if (pl.find(x => x.machine == resultado[i]["col0"] &&
                    x.Shift == resultado[i]["col4"].toString().trim()[0] && x.PartNumber == resultado[i]["col5"].trim() &&
                    x.Customer == resultado[i]["col6"].trim() && x.LevenDesign == resultado[i]["col7"].trim() && x.Shortpart == resultado[i]["col8"].trim()) == null
                    &&
                    plan.find(x => x.machine == resultado[i]["col0"] &&
                        x.Shift == resultado[i]["col4"].toString().trim()[0] && x.PartNumber == resultado[i]["col5"].trim() &&
                        x.Customer == resultado[i]["col6"].trim() && x.LevenDesign == resultado[i]["col7"].trim() && x.Shortpart == resultado[i]["col8"].trim()) == null) {
                    pl.push({
                        machine: resultado[i]["col0"],
                        Capacity: resultado[i]["col1"] == "" || resultado[i]["col1"] == null ? 0 : parseFloat(resultado[i]["col1"]),
                        Line: resultado[i]["col2"].trim(),
                        Program: resultado[i]["col3"].trim(),
                        Shift: resultado[i]["col4"].toString()[0],
                        PartNumber: resultado[i]["col5"].trim(),
                        Customer: resultado[i]["col6"].trim(),
                        LevenDesign: resultado[i]["col7"].trim(),
                        Shortpart: resultado[i]["col8"].trim(),
                        Kmh: resultado[i]["col9"],
                        d1: resultado[i]["col10"] == "" || resultado[i]["col10"] == null ? 0 : resultado[i]["col10"].toString().split(".")[0],
                        d2: resultado[i]["col11"] == "" || resultado[i]["col11"] == null ? 0 : resultado[i]["col11"].toString().split(".")[0],
                        d3: resultado[i]["col12"] == "" || resultado[i]["col12"] == null ? 0 : resultado[i]["col12"].toString().split(".")[0],
                        d4: resultado[i]["col13"] == "" || resultado[i]["col13"] == null ? 0 : resultado[i]["col13"].toString().split(".")[0],
                        d5: resultado[i]["col14"] == "" || resultado[i]["col14"] == null ? 0 : resultado[i]["col14"].toString().split(".")[0],
                        d6: resultado[i]["col15"] == "" || resultado[i]["col15"] == null ? 0 : resultado[i]["col15"].toString().split(".")[0],
                        d7: resultado[i]["col16"] == "" || resultado[i]["col16"] == null ? 0 : resultado[i]["col16"].toString().split(".")[0],
                        d8: resultado[i]["col17"] == "" || resultado[i]["col17"] == null ? 0 : resultado[i]["col17"].toString().split(".")[0],
                        d9: resultado[i]["col18"] == "" || resultado[i]["col18"] == null ? 0 : resultado[i]["col18"].toString().split(".")[0],
                        d10: resultado[i]["col19"] == "" || resultado[i]["col19"] == null ? 0 : resultado[i]["col19"].toString().split(".")[0],
                        d11: resultado[i]["col20"] == "" || resultado[i]["col20"] == null ? 0 : resultado[i]["col20"].toString().split(".")[0],
                        d12: resultado[i]["col21"] == "" || resultado[i]["col21"] == null ? 0 : resultado[i]["col21"].toString().split(".")[0],
                        d13: resultado[i]["col22"] == "" || resultado[i]["col22"] == null ? 0 : resultado[i]["col22"].toString().split(".")[0],
                        d14: resultado[i]["col23"] == "" || resultado[i]["col23"] == null ? 0 : resultado[i]["col23"].toString().split(".")[0],
                        d15: resultado[i]["col24"] == "" || resultado[i]["col24"] == null ? 0 : resultado[i]["col24"].toString().split(".")[0],
                        d16: resultado[i]["col25"] == "" || resultado[i]["col25"] == null ? 0 : resultado[i]["col25"].toString().split(".")[0],
                        d17: resultado[i]["col26"] == "" || resultado[i]["col26"] == null ? 0 : resultado[i]["col26"].toString().split(".")[0],
                        d18: resultado[i]["col27"] == "" || resultado[i]["col27"] == null ? 0 : resultado[i]["col27"].toString().split(".")[0],
                        d19: resultado[i]["col28"] == "" || resultado[i]["col28"] == null ? 0 : resultado[i]["col28"].toString().split(".")[0],
                        d20: resultado[i]["col29"] == "" || resultado[i]["col29"] == null ? 0 : resultado[i]["col29"].toString().split(".")[0],
                        d21: resultado[i]["col30"] == "" || resultado[i]["col30"] == null ? 0 : resultado[i]["col30"].toString().split(".")[0],
                        d22: resultado[i]["col31"] == "" || resultado[i]["col31"] == null ? 0 : resultado[i]["col31"].toString().split(".")[0],
                        d23: resultado[i]["col32"] == "" || resultado[i]["col32"] == null ? 0 : resultado[i]["col32"].toString().split(".")[0],
                        d24: resultado[i]["col33"] == "" || resultado[i]["col33"] == null ? 0 : resultado[i]["col33"].toString().split(".")[0],
                        d25: resultado[i]["col34"] == "" || resultado[i]["col34"] == null ? 0 : resultado[i]["col34"].toString().split(".")[0],
                        d26: resultado[i]["col35"] == "" || resultado[i]["col35"] == null ? 0 : resultado[i]["col35"].toString().split(".")[0],
                        d27: resultado[i]["col36"] == "" || resultado[i]["col36"] == null ? 0 : resultado[i]["col36"].toString().split(".")[0],
                        d28: resultado[i]["col37"] == "" || resultado[i]["col37"] == null ? 0 : resultado[i]["col37"].toString().split(".")[0],
                        d29: resultado[i]["col38"] == "" || resultado[i]["col38"] == null ? 0 : resultado[i]["col38"].toString().split(".")[0],
                        d30: resultado[i]["col39"] == "" || resultado[i]["col39"] == null ? 0 : resultado[i]["col39"].toString().split(".")[0],
                        d31: resultado[i]["col40"] == "" || resultado[i]["col40"] == null ? 0 : resultado[i]["col40"].toString().split(".")[0],
                        createdAt: insert
                    })
                    //break;
                }
                else if (plan.find(x => x.machine == resultado[i]["col0"] &&
                    x.Shift == resultado[i]["col4"].toString().trim()[0] && x.PartNumber == resultado[i]["col5"].trim() &&
                    x.Customer == resultado[i]["col6"].trim() && x.LevenDesign == resultado[i]["col7"].trim() && x.Shortpart == resultado[i]["col8"].trim()) != null) {
                    const upd = plan.find(x => x.machine == resultado[i]["col0"] &&
                        x.Shift == resultado[i]["col4"].toString().trim()[0] && x.PartNumber == resultado[i]["col5"].trim() &&
                        x.Customer == resultado[i]["col6"].trim() && x.LevenDesign == resultado[i]["col7"].trim() && x.Shortpart == resultado[i]["col8"].trim())

                    if (upd != null) {

                        if (
                            upd.Line == resultado[i]["col2"].trim() &&
                            upd.Program == resultado[i]["col3"].trim() &&
                            upd.d1 == (resultado[i]["col10"] == "" || resultado[i]["col10"] == null ? 0 : resultado[i]["col10"].toString().split(".")[0]) &&
                            upd.d2 == (resultado[i]["col11"] == "" || resultado[i]["col11"] == null ? 0 : resultado[i]["col11"].toString().split(".")[0]) &&
                            upd.d3 == (resultado[i]["col12"] == "" || resultado[i]["col12"] == null ? 0 : resultado[i]["col12"].toString().split(".")[0]) &&
                            upd.d4 == (resultado[i]["col13"] == "" || resultado[i]["col13"] == null ? 0 : resultado[i]["col13"].toString().split(".")[0]) &&
                            upd.d5 == (resultado[i]["col14"] == "" || resultado[i]["col14"] == null ? 0 : resultado[i]["col14"].toString().split(".")[0]) &&
                            upd.d6 == (resultado[i]["col15"] == "" || resultado[i]["col15"] == null ? 0 : resultado[i]["col15"].toString().split(".")[0]) &&
                            upd.d7 == (resultado[i]["col16"] == "" || resultado[i]["col16"] == null ? 0 : resultado[i]["col16"].toString().split(".")[0]) &&
                            upd.d8 == (resultado[i]["col17"] == "" || resultado[i]["col17"] == null ? 0 : resultado[i]["col17"].toString().split(".")[0]) &&
                            upd.d9 == (resultado[i]["col18"] == "" || resultado[i]["col18"] == null ? 0 : resultado[i]["col18"].toString().split(".")[0]) &&
                            upd.d10 == (resultado[i]["col19"] == "" || resultado[i]["col19"] == null ? 0 : resultado[i]["col19"].toString().split(".")[0]) &&
                            upd.d11 == (resultado[i]["col20"] == "" || resultado[i]["col20"] == null ? 0 : resultado[i]["col20"].toString().split(".")[0]) &&
                            upd.d12 == (resultado[i]["col21"] == "" || resultado[i]["col21"] == null ? 0 : resultado[i]["col21"].toString().split(".")[0]) &&
                            upd.d13 == (resultado[i]["col22"] == "" || resultado[i]["col22"] == null ? 0 : resultado[i]["col22"].toString().split(".")[0]) &&
                            upd.d14 == (resultado[i]["col23"] == "" || resultado[i]["col23"] == null ? 0 : resultado[i]["col23"].toString().split(".")[0]) &&
                            upd.d15 == (resultado[i]["col24"] == "" || resultado[i]["col24"] == null ? 0 : resultado[i]["col24"].toString().split(".")[0]) &&
                            upd.d16 == (resultado[i]["col25"] == "" || resultado[i]["col25"] == null ? 0 : resultado[i]["col25"].toString().split(".")[0]) &&
                            upd.d17 == (resultado[i]["col26"] == "" || resultado[i]["col26"] == null ? 0 : resultado[i]["col26"].toString().split(".")[0]) &&
                            upd.d18 == (resultado[i]["col27"] == "" || resultado[i]["col27"] == null ? 0 : resultado[i]["col27"].toString().split(".")[0]) &&
                            upd.d19 == (resultado[i]["col28"] == "" || resultado[i]["col28"] == null ? 0 : resultado[i]["col28"].toString().split(".")[0]) &&
                            upd.d20 == (resultado[i]["col29"] == "" || resultado[i]["col29"] == null ? 0 : resultado[i]["col29"].toString().split(".")[0]) &&
                            upd.d21 == (resultado[i]["col30"] == "" || resultado[i]["col30"] == null ? 0 : resultado[i]["col30"].toString().split(".")[0]) &&
                            upd.d22 == (resultado[i]["col31"] == "" || resultado[i]["col31"] == null ? 0 : resultado[i]["col31"].toString().split(".")[0]) &&
                            upd.d23 == (resultado[i]["col32"] == "" || resultado[i]["col32"] == null ? 0 : resultado[i]["col32"].toString().split(".")[0]) &&
                            upd.d24 == (resultado[i]["col33"] == "" || resultado[i]["col33"] == null ? 0 : resultado[i]["col33"].toString().split(".")[0]) &&
                            upd.d25 == (resultado[i]["col34"] == "" || resultado[i]["col34"] == null ? 0 : resultado[i]["col34"].toString().split(".")[0]) &&
                            upd.d26 == (resultado[i]["col35"] == "" || resultado[i]["col35"] == null ? 0 : resultado[i]["col35"].toString().split(".")[0]) &&
                            upd.d27 == (resultado[i]["col36"] == "" || resultado[i]["col36"] == null ? 0 : resultado[i]["col36"].toString().split(".")[0]) &&
                            upd.d28 == (resultado[i]["col37"] == "" || resultado[i]["col37"] == null ? 0 : resultado[i]["col37"].toString().split(".")[0]) &&
                            upd.d29 == (resultado[i]["col38"] == "" || resultado[i]["col38"] == null ? 0 : resultado[i]["col38"].toString().split(".")[0]) &&
                            upd.d30 == (resultado[i]["col39"] == "" || resultado[i]["col39"] == null ? 0 : resultado[i]["col39"].toString().split(".")[0]) &&
                            upd.d31 == (resultado[i]["col40"] == "" || resultado[i]["col40"] == null ? 0 : resultado[i]["col40"].toString().split(".")[0])
                        ) {
                            continue
                        }


                        upd.Line = resultado[i]["col2"].trim()
                        upd.Program = resultado[i]["col3"].trim()
                        upd.Capacity = resultado[i]["col1"] == "" || resultado[i]["col1"] == null ? 0 : parseFloat(resultado[i]["col1"])
                        upd.d1 = resultado[i]["col10"] == "" || resultado[i]["col10"] == null ? 0 : resultado[i]["col10"].toString().split(".")[0]
                        upd.d2 = resultado[i]["col11"] == "" || resultado[i]["col11"] == null ? 0 : resultado[i]["col11"].toString().split(".")[0]
                        upd.d3 = resultado[i]["col12"] == "" || resultado[i]["col12"] == null ? 0 : resultado[i]["col12"].toString().split(".")[0]
                        upd.d4 = resultado[i]["col13"] == "" || resultado[i]["col13"] == null ? 0 : resultado[i]["col13"].toString().split(".")[0]
                        upd.d5 = resultado[i]["col14"] == "" || resultado[i]["col14"] == null ? 0 : resultado[i]["col14"].toString().split(".")[0]
                        upd.d6 = resultado[i]["col15"] == "" || resultado[i]["col15"] == null ? 0 : resultado[i]["col15"].toString().split(".")[0]
                        upd.d7 = resultado[i]["col16"] == "" || resultado[i]["col16"] == null ? 0 : resultado[i]["col16"].toString().split(".")[0]
                        upd.d8 = resultado[i]["col17"] == "" || resultado[i]["col17"] == null ? 0 : resultado[i]["col17"].toString().split(".")[0]
                        upd.d9 = resultado[i]["col18"] == "" || resultado[i]["col18"] == null ? 0 : resultado[i]["col18"].toString().split(".")[0]
                        upd.d10 = resultado[i]["col19"] == "" || resultado[i]["col19"] == null ? 0 : resultado[i]["col19"].toString().split(".")[0]
                        upd.d11 = resultado[i]["col20"] == "" || resultado[i]["col20"] == null ? 0 : resultado[i]["col20"].toString().split(".")[0]
                        upd.d12 = resultado[i]["col21"] == "" || resultado[i]["col21"] == null ? 0 : resultado[i]["col21"].toString().split(".")[0]
                        upd.d13 = resultado[i]["col22"] == "" || resultado[i]["col22"] == null ? 0 : resultado[i]["col22"].toString().split(".")[0]
                        upd.d14 = resultado[i]["col23"] == "" || resultado[i]["col23"] == null ? 0 : resultado[i]["col23"].toString().split(".")[0]
                        upd.d15 = resultado[i]["col24"] == "" || resultado[i]["col24"] == null ? 0 : resultado[i]["col24"].toString().split(".")[0]
                        upd.d16 = resultado[i]["col25"] == "" || resultado[i]["col25"] == null ? 0 : resultado[i]["col25"].toString().split(".")[0]
                        upd.d17 = resultado[i]["col26"] == "" || resultado[i]["col26"] == null ? 0 : resultado[i]["col26"].toString().split(".")[0]
                        upd.d18 = resultado[i]["col27"] == "" || resultado[i]["col27"] == null ? 0 : resultado[i]["col27"].toString().split(".")[0]
                        upd.d19 = resultado[i]["col28"] == "" || resultado[i]["col28"] == null ? 0 : resultado[i]["col28"].toString().split(".")[0]
                        upd.d20 = resultado[i]["col29"] == "" || resultado[i]["col29"] == null ? 0 : resultado[i]["col29"].toString().split(".")[0]
                        upd.d21 = resultado[i]["col30"] == "" || resultado[i]["col30"] == null ? 0 : resultado[i]["col30"].toString().split(".")[0]
                        upd.d22 = resultado[i]["col31"] == "" || resultado[i]["col31"] == null ? 0 : resultado[i]["col31"].toString().split(".")[0]
                        upd.d23 = resultado[i]["col32"] == "" || resultado[i]["col32"] == null ? 0 : resultado[i]["col32"].toString().split(".")[0]
                        upd.d24 = resultado[i]["col33"] == "" || resultado[i]["col33"] == null ? 0 : resultado[i]["col33"].toString().split(".")[0]
                        upd.d25 = resultado[i]["col34"] == "" || resultado[i]["col34"] == null ? 0 : resultado[i]["col34"].toString().split(".")[0]
                        upd.d26 = resultado[i]["col35"] == "" || resultado[i]["col35"] == null ? 0 : resultado[i]["col35"].toString().split(".")[0]
                        upd.d27 = resultado[i]["col36"] == "" || resultado[i]["col36"] == null ? 0 : resultado[i]["col36"].toString().split(".")[0]
                        upd.d28 = resultado[i]["col37"] == "" || resultado[i]["col37"] == null ? 0 : resultado[i]["col37"].toString().split(".")[0]
                        upd.d29 = resultado[i]["col38"] == "" || resultado[i]["col38"] == null ? 0 : resultado[i]["col38"].toString().split(".")[0]
                        upd.d30 = resultado[i]["col39"] == "" || resultado[i]["col39"] == null ? 0 : resultado[i]["col39"].toString().split(".")[0]
                        upd.d31 = resultado[i]["col40"] == "" || resultado[i]["col40"] == null ? 0 : resultado[i]["col40"].toString().split(".")[0]

                        //if (upd.id == 1) {
                            //console.log("modificar", upd.id)
                            //console.log(upd)
                        //}
                        const data = await Plans.update(upd.dataValues, {
                            where: [
                                {
                                    id: upd.id
                                }
                            ]
                        })
                        //if (upd.id == 1) {
                            console.log("modificado", data)
                        //}
                    }
                    else {
                    }


                }
            }
            await Plans.bulkCreate(pl, {
                logging: false
            })


            res.json({
                resultado,
                fecha
            });
        }
        catch (error) {
            console.log(error.message)
            //const error = new Error('La maquina no fue encontrada')
            return res.status(401).json({ error: error.message })
        }
    }
    static PlanManual: any = async (req: Request, res: Response) => {


        let machines = []
        const { fecha, Capacity, Shortpart, Kmh, machine, Line, Program, Shift, PartNumber, Customer, LevenDesign,
            d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20, d21, d22, d23, d24, d25, d26, d27, d28, d29, d30, d31
        } = req.body
        let [year, month, day] = fecha
            .split("-")
            .map(Number);
        const dt = new Date(year, month - 1, 2);
        const inicioSiguienteMes = new Date(
            dt.getFullYear(),
            dt.getMonth() + 1,
            1
        );
        const insert = new Date(dt)
        insert.setDate(insert.getDate() + 1)


        const smhcas = await Smhcas.findOne({
            where: [
                {
                    Shortpart: Shortpart
                }
            ]
        })
        if (smhcas) {
            const update = await Smhcas.update({
                Kmh: Kmh
            }, {
                where: {
                    ShortPart: Shortpart
                }
            })
            console.log("modificar")
            console.log(update)
        }
        else {
            const create = await Smhcas.create({
                ShortPart: Shortpart,
                Kmh: Kmh
            })
            console.log("crear")
            console.log(create)
        }



        const plan = await Plans.findOne({
            where: {
                machine: machine,
                Shift: Shift,
                PartNumber: PartNumber,
                Customer: Customer,
                LevenDesign: LevenDesign,
                Shortpart: Shortpart,
                createdAt: {
                    [Op.gte]: dt,
                    [Op.lt]: inicioSiguienteMes
                }
            }
        })

        if (!plan) {
            const create = await Plans.create({
                machine: machine,
                Line: Line,
                Shift: Shift,
                Capacity: Capacity,
                PartNumber: PartNumber,
                Customer: Customer,
                LevenDesign: LevenDesign,
                Shortpart: Shortpart,
                Program: Program,
                Kmh: Kmh,
                d1,
                d2,
                d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18,
                d19, d20, d21, d22, d23, d24, d25, d26, d27, d28, d29, d30, d31,
                createdAt: insert
            })
            console.log(create)
        }
        else {
            const create = await Plans.update({
                machine: machine,
                Line: Line,
                Shift: Shift,
                Capacity: Capacity,
                PartNumber: PartNumber,
                Customer: Customer,
                LevenDesign: LevenDesign,
                Shortpart: Shortpart,
                Program: Program,
                Kmh: Kmh,
                d1,
                d2,
                d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18,
                d19, d20, d21, d22, d23, d24, d25, d26, d27, d28, d29, d30, d31,
            }, {
                where: {
                    id: plan.id
                }
            })
        }


        res.send("Se ha generado el plan de manera manual");
    }
    static PlanEditManual: any = async (req: Request, res: Response) => {


        let machines = []
        const { fecha, Capacity, Shortpart, Kmh, machine, Line, Program, Shift, PartNumber, Customer, LevenDesign,
            d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20, d21, d22, d23, d24, d25, d26, d27, d28, d29, d30, d31
        } = req.body
        let [year, month, day] = fecha
            .split("-")
            .map(Number);
        const dt = new Date(year, month - 1, 2);
        const inicioSiguienteMes = new Date(
            dt.getFullYear(),
            dt.getMonth() + 1,
            1
        );
        const insert = new Date(dt)
        insert.setDate(insert.getDate() + 1)


        const smhcas = await Smhcas.findOne({
            where: [
                {
                    Shortpart: Shortpart
                }
            ]
        })

        const update = await Smhcas.update({
            Kmh: Kmh
        }, {
            where: {
                ShortPart: Shortpart
            }
        })
        console.log("modificar")
        console.log(update)


        const plan = await Plans.findOne({
            where: {
                machine: machine,
                Shift: Shift,
                PartNumber: PartNumber,
                Customer: Customer,
                LevenDesign: LevenDesign,
                Shortpart: Shortpart,
                id: {
                    [Op.not]: req.Plans.id
                },
                createdAt: {
                    [Op.gte]: dt,
                    [Op.lt]: inicioSiguienteMes
                }
            }
        })

        if (!plan) {

            const create = await Plans.update({
                machine: machine,
                Line: Line,
                Capacity: Capacity,
                Shift: Shift,
                PartNumber: PartNumber,
                Customer: Customer,
                LevenDesign: LevenDesign,
                Shortpart: Shortpart,
                Program: Program,
                Kmh: Kmh,
                d1,
                d2,
                d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18,
                d19, d20, d21, d22, d23, d24, d25, d26, d27, d28, d29, d30, d31,
            }, {
                where: {
                    id: req.Plans.id
                }
            })
        }
        else {
            const error = new Error('Ya coincide con un plan no puede ser generado')
            return res.status(401).json({ error: error.message })
        }



        res.send("Se ha generado el plan de manera manual");
    }

    static PlanView = async (req: Request, res: Response) => {
        const tenantsGacs: DBConfig[] = [
        ];
        const tenantsIGHS: DBConfig[] = [
        ];
        //const { fecha } = req.body || req.params
        const fecha = req.body?.fecha || req.query?.fecha;
        const shift = req.body?.shift || req.query?.shift;



        const dt = new Date((fecha ?? '2025-04-01').toString())
        dt.setDate(0)

        const inicioSiguienteMes = new Date(
            dt.getFullYear(),
            dt.getMonth() + 2,
            1
        );

        let machines = []
        if (req.User.PlantId == null) {
            const machine = await Machine.findAll({
                where: [
                    {
                        status: true,
                    }
                ]
            })
            machines = machine.map(row => row.machineCode);
        }
        else {
            const machine = await Machine.findAll({
                where: [
                    {
                        status: true,
                        PlantId: req.User?.PlantId
                    }
                ]
            })
            machines = machine.map(row => row.machineCode);
        }

        const servers = await Codes.findAll({
            attributes: ["key", "type", 'cryServer'],
            include: [{
                model: Machine,
                required: true,
                as: "Machine",
                where: [{
                    machineCode: {
                        [Op.in]: machines
                    }
                }],
                attributes: [],
            }],
        })

        for (let index = 0; index < servers.length; index++) {
            try {
                if (servers[index].type == 2) {
                    if (tenantsGacs.filter(x => x.name == servers[index].name).length == 0) {
                        const cry = decrypt(servers[index].cryServer)
                        tenantsGacs.push({
                            name: servers[index].key,
                            host: cry.split('|')[0],
                            database: cry.split('|')[1],
                            username: "tepicsa",
                            password: "tepsa59$"
                        })
                    }

                }
                else if (servers[index].type == 1) {
                    if (tenantsIGHS.filter(x => x.name == servers[index].name).length == 0) {
                        const cryighs = decrypt(servers[index].cryServer)
                        const host = normalizes(cryighs.split('|')[0]);
                        tenantsIGHS.push({
                            name: servers[index].key,
                            host: `IGHS-ATN-L3-02\\IGHSATNL302`,
                            database: cryighs.split('|')[1],
                            username: "LC_USR1",
                            password: "G8sfxhkM"
                        })
                    }

                }
            } catch (error) {
                console.log(error)
            }
        }
        /*{
                                [Op.in]:machines
                            }*/

        const promises = tenantsGacs.map(async (t) => {
            const conn = await TenantConnection(t);

            return withTimeout(
                this.GetAllPiecesByMonth(conn, dt, shift),
                10000 // 3 segundos max
            );
        });

        const results = await Promise.allSettled(promises);
        const data = []

        for (let index = 0; index < results.length; index++) {
            data.push(...results[index]["value"]);
        }
        if (shift == 0) {
            const plan = await Plans.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: dt,
                        [Op.lt]: inicioSiguienteMes
                    },
                    machine: {
                        [Op.in]: machines
                    },
                }
            })

            const plantConvert: Plans[] = []
            for (let index = 0; index < plan.length; index++) {
                const p = plan[index]
                const exist = plantConvert.find(x =>
                    x.machine == p.machine &&
                    x.PartNumber == p.PartNumber &&
                    x.Customer == p.Customer &&
                    x.LevenDesign == p.LevenDesign &&
                    x.Shortpart == p.Shortpart
                )
                if (exist) {
                    exist.d1 += p.d1
                    exist.d2 += p.d2
                    exist.d3 += p.d3
                    exist.d4 += p.d4
                    exist.d5 += p.d5
                    exist.d6 += p.d6
                    exist.d7 += p.d7
                    exist.d8 += p.d8
                    exist.d9 += p.d9
                    exist.d10 += p.d10
                    exist.d11 += p.d11
                    exist.d12 += p.d12
                    exist.d13 += p.d13
                    exist.d14 += p.d14
                    exist.d15 += p.d15
                    exist.d16 += p.d16
                    exist.d17 += p.d17
                    exist.d18 += p.d18
                    exist.d19 += p.d19
                    exist.d20 += p.d20
                    exist.d21 += p.d21
                    exist.d22 += p.d22
                    exist.d23 += p.d23
                    exist.d24 += p.d24
                    exist.d25 += p.d25
                    exist.d26 += p.d26
                    exist.d27 += p.d27
                    exist.d28 += p.d28
                    exist.d29 += p.d29
                    exist.d30 += p.d30
                }
                else {
                    plantConvert.push({
                        id: p.id,
                        machine: p.machine,
                        Capacity: p.Capacity,
                        Line: p.Line,
                        Program: p.Program,
                        Shift: "0",
                        PartNumber: p.PartNumber,
                        Customer: p.Customer,
                        LevenDesign: p.LevenDesign,
                        Shortpart: p.Shortpart,
                        Kmh: p.Kmh,
                        d1: p.d1,
                        d2: p.d2,
                        d3: p.d3,
                        d4: p.d4,
                        d5: p.d5,
                        d6: p.d6,
                        d7: p.d7,
                        d8: p.d8,
                        d9: p.d9,
                        d10: p.d10,
                        d11: p.d11,
                        d12: p.d12,
                        d13: p.d13,
                        d14: p.d14,
                        d15: p.d15,
                        d16: p.d16,
                        d17: p.d17,
                        d18: p.d18,
                        d19: p.d19,
                        d20: p.d20,
                        d21: p.d21,
                        d22: p.d22,
                        d23: p.d23,
                        d24: p.d24,
                        d25: p.d25,
                        d26: p.d26,
                        d27: p.d27,
                        d28: p.d28,
                        d29: p.d29,
                        d30: p.d30,
                        d31: p.d31
                    } as Plans)
                }

            }
            return res.json({ send: data, plan: plantConvert })
        }

        else {
            const plan = await Plans.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: dt,
                        [Op.lt]: inicioSiguienteMes
                    },
                    machine: {
                        [Op.in]: machines
                    },
                    Shift: shift
                }
            })
            return res.json({ send: data, plan })
        }

    }

    static PartNumberMachine = async (req: Request, res: Response) => {

        const { machineId } = req.params

        let machine =
            await Machine.findOne({
                where: {
                    status: true,
                    id: machineId
                },
                include: [
                    { model: Codes, as: "Codes" },
                ]
            });
        if (!machine) {
            const error = new Error('La maquina no fue encontrada')
            return res.status(401).json({ error: error.message })
        }


        if (req.User.PlantId != null) {
            if (machine.PlantId != req.User.PlantId) {
                const error = new Error('La maquina no fue encontrada')
                return res.status(401).json({ error: error.message })
            }
        }

        const PartNumbers = await Plans.findAll({
            attributes: ['PartNumber'],
            group: ['PartNumber'],
            raw: true,
            where: {

                machine: machine.machineCode,
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('YEAR', Sequelize.col('createdAt')),
                        Sequelize.fn('YEAR', Sequelize.fn('GETDATE'))
                    ),
                    Sequelize.where(
                        Sequelize.fn('MONTH', Sequelize.col('createdAt')),
                        Sequelize.fn('MONTH', Sequelize.fn('GETDATE'))
                    )
                ]
            }
        });

        return res.json(PartNumbers)
    }


    static GetAllPiecesByMonth = async (sequelize: Sequelize, fecha: Date, shift: number) => {
        let hours = null
        if (shift == 1) {
            hours = process.env.HOURSTA.split('|')
        }
        else {
            hours = process.env.HOURSTB.split('|')
        }
        const query = `
            select line_c,SUBSTRING(prodlbl_no,5,4) ShortPart, count(line_c) as total
			from insp_res
			where wrkproc_c='p2' and insp_dt>= :START and insp_dt< :ENDS 
            ${shift == 0 ?
                ""
                :
                parseInt(hours[0]) > parseInt(hours[1]) ? " AND ( DATEPART(HH,insp_dt) >= :ST OR DATEPART(HH,insp_dt)< :EN )" : " AND ( DATEPART(HH,insp_dt) >= :ST AND DATEPART(HH,insp_dt)< :EN )"
            }
			group by line_c,SUBSTRING(prodlbl_no,5,4) 
        `;
        console.log("hors")
        console.log(hours)
        const dt = {
            START: "",
            END: "",
            ST: hours[0],
            EN: hours[1]
        }
        if (shift == 0) {
            const data = process.env.HOURSTA.split('|')
            dt.START = formatDate(fecha) + " " + data[0] + ":00:00"

            const inicioSiguienteMes = new Date(
                fecha.getFullYear(),
                fecha.getMonth() + 1,
                1
            );
            const n = inicioSiguienteMes
            dt.END = formatDate(n) + " " + data[0] + ":00:00"
        }
        else if (shift == 1) {
            const data = process.env.HOURSTA.split('|')

            dt.START = formatDate(fecha) + " " + data[0] + ":00:00"
            if (parseInt(data[2]) > 0) {


                const inicioSiguienteMes = new Date(
                    fecha.getFullYear(),
                    fecha.getMonth() + 2,
                    1
                );
                //const n = fecha.setDate(f.getDate() + 1)
                dt.END = formatDate(inicioSiguienteMes) + " " + data[1] + ":00:00"
            }
            else {
                const inicioSiguienteMes = new Date(
                    fecha.getFullYear(),
                    fecha.getMonth() + 1,
                    1
                );
                const n = inicioSiguienteMes
                dt.END = formatDate(n) + " " + data[1] + ":00:00"
            }
        }
        else {
            const data = process.env.HOURSTB.split('|')
            dt.START = formatDate(fecha) + " " + data[0] + ":00:00"
            if (parseInt(data[2]) > 0) {
                const inicioSiguienteMes = new Date(
                    fecha.getFullYear(),
                    fecha.getMonth() + 1,
                    1
                );
                //const n = fecha.setDate(fecha.getDate() + 1)
                dt.END = formatDate(inicioSiguienteMes) + " " + data[1] + ":00:00"
            }
            else {
                const inicioSiguienteMes = new Date(
                    fecha.getFullYear(),
                    fecha.getMonth() + 1,
                    1
                );
                const n = inicioSiguienteMes
                dt.END = formatDate(n) + " " + data[1] + ":00:00"
            }
        }
        /*HOURSTA=7|17|0
    HOURSTB=17|2|1
    HOURSTC=2|6|0*/

        const result = await sequelize.query<{
            line_c: string;
            DAY: number;
            SHIFT: number;
            PROD: number;
        }>(query, {
            replacements: {
                START: dt.START,
                ENDS: dt.END,
                ST: hours[0],
                EN: hours[1]
            },
            type: QueryTypes.SELECT,
        });

        console.log({
            START: dt.START,
            ENDS: dt.END,
            ST: dt.ST,
            EN: dt.EN,
            FIN: "FIN"
        })


        //console.log(result)
        return result
    }

    static DeletePlan = async (req: Request, res: Response) => {
        try {
            const eliminar = await Plans.destroy({
                where: {
                    id: req.Plans.id
                }
            })
            res.send("Se han eliminado ")
        } catch (error) {
            const errores = new Error('No se ha podido eliminar el plan debido a algun problema.')
            return res.status(500).json({ error: errores.message })
        }

    }
}
