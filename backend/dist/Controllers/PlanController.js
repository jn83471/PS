"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanController = void 0;
const Index_1 = require("../Models/Index");
const Plan_1 = require("../Models/Plan");
const xlsx_1 = __importDefault(require("xlsx"));
const SMHCAS_1 = require("../Models/SMHCAS");
const sequelize_1 = require("sequelize");
const TenantConnection_1 = require("../config/TenantConnection");
const crypto_1 = require("../Utils/crypto");
const Gnr_1 = require("../Utils/Gnr");
class PlanController {
    static Index = async (req, res) => {
        //const { fecha } = req.body || req.params
        const fecha = req.body?.fecha || req.query?.fecha;
        console.error("fecha: " + fecha);
        const dt = new Date((fecha ?? '2025-04-01').toString());
        dt.setDate(0);
        const inicioSiguienteMes = new Date(dt.getFullYear(), dt.getMonth() + 2, 1);
        let machines = [];
        if (req.User.PlantId == null) {
            const machine = await Index_1.Machine.findAll({
                where: [
                    {
                        status: true,
                    }
                ]
            });
            machines = machine.map(row => row.machineCode);
        }
        else {
            const machine = await Index_1.Machine.findAll({
                where: [
                    {
                        status: true,
                        PlantId: req.User?.PlantId
                    }
                ]
            });
            machines = machine.map(row => row.machineCode);
        }
        const plan = await Plan_1.Plans.findAll({
            where: {
                createdAt: {
                    [sequelize_1.Op.gte]: dt,
                    [sequelize_1.Op.lt]: inicioSiguienteMes
                },
                machine: {
                    [sequelize_1.Op.in]: machines
                }
            }
        });
        return res.json(plan);
    };
    static Plan = async (req, res) => {
        let machines = [];
        if (req.User.PlantId == null) {
            const machine = await Index_1.Machine.findAll({
                where: [
                    {
                        status: true,
                    }
                ]
            });
            machines = machine.map(row => row.machineCode);
        }
        else {
            const machine = await Index_1.Machine.findAll({
                where: [
                    {
                        status: true,
                        PlantId: req.User?.PlantId
                    }
                ]
            });
            machines = machine.map(row => row.machineCode);
        }
        const { fecha } = req.body;
        const dt = new Date(fecha);
        dt.setDate(0);
        const inicioSiguienteMes = new Date(dt.getFullYear(), dt.getMonth() + 2, 1);
        //inicioSiguienteMes.setDate(inicioSiguienteMes.getDate() + 1);
        const workbook = xlsx_1.default.read(req.file.buffer, {
            type: 'buffer'
        });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const datos = xlsx_1.default.utils.sheet_to_json(sheet, {
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
        const smhcas = await SMHCAS_1.Smhcas.findAll();
        const smh = [];
        for (let i = 0; i < resultado.length; i++) {
            if (smh.find(x => x.ShortPart == resultado[i]["col8"]) == null && smhcas.find(x => x.ShortPart == resultado[i]["col8"]) == null) {
                smh.push({
                    ShortPart: resultado[i]["col8"],
                    Kmh: resultado[i]["col9"]
                });
            }
        }
        await SMHCAS_1.Smhcas.bulkCreate(smh);
        const plan = await Plan_1.Plans.findAll({
            where: {
                createdAt: {
                    [sequelize_1.Op.gte]: dt,
                    [sequelize_1.Op.lt]: inicioSiguienteMes
                }
            }
        });
        const insert = new Date(dt);
        insert.setDate(insert.getDate() + 1);
        //return res.json({ plan, dt, inicioSiguienteMes })
        const pl = [];
        for (let i = 0; i < resultado.length; i++) {
            if (!machines.includes(resultado[i]["col0"])) {
                //console.error("maquina no existe")
                continue;
            }
            if (pl.find(x => x.machine == resultado[i]["col0"] && x.Capacity == (resultado[i]["col1"] == "" || resultado[i]["col1"] == null ? 0 : parseFloat(resultado[i]["col1"])) &&
                x.Program == resultado[i]["col3"] && x.Shift == resultado[i]["col4"] && x.PartNumber == resultado[i]["col5"] &&
                x.Customer == resultado[i]["col6"] && x.LevenDesign == resultado[i]["col7"] && x.Shortpart == resultado[i]["col8"]) == null
                &&
                    plan.find(x => x.machine == resultado[i]["col0"] && x.Capacity == (resultado[i]["col1"] == "" || resultado[i]["col10"] == null ? 0 : parseFloat(resultado[i]["col1"])) &&
                        x.Program == resultado[i]["col3"] && x.Shift == resultado[i]["col4"] && x.PartNumber == resultado[i]["col5"] &&
                        x.Customer == resultado[i]["col6"] && x.LevenDesign == resultado[i]["col7"] && x.Shortpart == resultado[i]["col8"]) == null) {
                pl.push({
                    machine: resultado[i]["col0"],
                    Capacity: resultado[i]["col1"] == "" || resultado[i]["col1"] == null ? 0 : parseFloat(resultado[i]["col1"]),
                    Line: resultado[i]["col2"],
                    Program: resultado[i]["col3"],
                    Shift: resultado[i]["col4"],
                    PartNumber: resultado[i]["col5"],
                    Customer: resultado[i]["col6"],
                    LevenDesign: resultado[i]["col7"],
                    Shortpart: resultado[i]["col8"],
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
                });
                //break;
            }
            else if (plan.find(x => x.machine == resultado[i]["col0"] && x.Capacity == (resultado[i]["col1"] == "" || resultado[i]["col10"] == null ? 0 : parseFloat(resultado[i]["col1"])) &&
                x.Program == resultado[i]["col3"] && x.Shift == resultado[i]["col4"] && x.PartNumber == resultado[i]["col5"] &&
                x.Customer == resultado[i]["col6"] && x.LevenDesign == resultado[i]["col7"] && x.Shortpart == resultado[i]["col8"]) != null) {
                const upd = plan.find(x => x.machine == resultado[i]["col0"] && x.Capacity == (resultado[i]["col1"] == "" || resultado[i]["col10"] == null ? 0 : parseFloat(resultado[i]["col1"])) &&
                    x.Program == resultado[i]["col3"] && x.Shift == resultado[i]["col4"] && x.PartNumber == resultado[i]["col5"] &&
                    x.Customer == resultado[i]["col6"] && x.LevenDesign == resultado[i]["col7"] && x.Shortpart == resultado[i]["col8"]);
                if (upd != null) {
                    if (upd.d1 == (resultado[i]["col10"] == "" || resultado[i]["col10"] == null ? 0 : resultado[i]["col10"].toString().split(".")[0]) &&
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
                        upd.d31 == (resultado[i]["col40"] == "" || resultado[i]["col40"] == null ? 0 : resultado[i]["col40"].toString().split(".")[0])) {
                        continue;
                    }
                    upd.Kmh = resultado[i]["col9"];
                    upd.d1 = resultado[i]["col10"] == "" || resultado[i]["col10"] == null ? 0 : resultado[i]["col10"].toString().split(".")[0];
                    upd.d2 = resultado[i]["col11"] == "" || resultado[i]["col11"] == null ? 0 : resultado[i]["col11"].toString().split(".")[0];
                    upd.d3 = resultado[i]["col12"] == "" || resultado[i]["col12"] == null ? 0 : resultado[i]["col12"].toString().split(".")[0];
                    upd.d4 = resultado[i]["col13"] == "" || resultado[i]["col13"] == null ? 0 : resultado[i]["col13"].toString().split(".")[0];
                    upd.d5 = resultado[i]["col14"] == "" || resultado[i]["col14"] == null ? 0 : resultado[i]["col14"].toString().split(".")[0];
                    upd.d6 = resultado[i]["col15"] == "" || resultado[i]["col15"] == null ? 0 : resultado[i]["col15"].toString().split(".")[0];
                    upd.d7 = resultado[i]["col16"] == "" || resultado[i]["col16"] == null ? 0 : resultado[i]["col16"].toString().split(".")[0];
                    upd.d8 = resultado[i]["col17"] == "" || resultado[i]["col17"] == null ? 0 : resultado[i]["col17"].toString().split(".")[0];
                    upd.d9 = resultado[i]["col18"] == "" || resultado[i]["col18"] == null ? 0 : resultado[i]["col18"].toString().split(".")[0];
                    upd.d10 = resultado[i]["col19"] == "" || resultado[i]["col19"] == null ? 0 : resultado[i]["col19"].toString().split(".")[0];
                    upd.d11 = resultado[i]["col20"] == "" || resultado[i]["col20"] == null ? 0 : resultado[i]["col20"].toString().split(".")[0];
                    upd.d12 = resultado[i]["col21"] == "" || resultado[i]["col21"] == null ? 0 : resultado[i]["col21"].toString().split(".")[0];
                    upd.d13 = resultado[i]["col22"] == "" || resultado[i]["col22"] == null ? 0 : resultado[i]["col22"].toString().split(".")[0];
                    upd.d14 = resultado[i]["col23"] == "" || resultado[i]["col23"] == null ? 0 : resultado[i]["col23"].toString().split(".")[0];
                    upd.d15 = resultado[i]["col24"] == "" || resultado[i]["col24"] == null ? 0 : resultado[i]["col24"].toString().split(".")[0];
                    upd.d16 = resultado[i]["col25"] == "" || resultado[i]["col25"] == null ? 0 : resultado[i]["col25"].toString().split(".")[0];
                    upd.d17 = resultado[i]["col26"] == "" || resultado[i]["col26"] == null ? 0 : resultado[i]["col26"].toString().split(".")[0];
                    upd.d18 = resultado[i]["col27"] == "" || resultado[i]["col27"] == null ? 0 : resultado[i]["col27"].toString().split(".")[0];
                    upd.d19 = resultado[i]["col28"] == "" || resultado[i]["col28"] == null ? 0 : resultado[i]["col28"].toString().split(".")[0];
                    upd.d20 = resultado[i]["col29"] == "" || resultado[i]["col29"] == null ? 0 : resultado[i]["col29"].toString().split(".")[0];
                    upd.d21 = resultado[i]["col30"] == "" || resultado[i]["col30"] == null ? 0 : resultado[i]["col30"].toString().split(".")[0];
                    upd.d22 = resultado[i]["col31"] == "" || resultado[i]["col31"] == null ? 0 : resultado[i]["col31"].toString().split(".")[0];
                    upd.d23 = resultado[i]["col32"] == "" || resultado[i]["col32"] == null ? 0 : resultado[i]["col32"].toString().split(".")[0];
                    upd.d24 = resultado[i]["col33"] == "" || resultado[i]["col33"] == null ? 0 : resultado[i]["col33"].toString().split(".")[0];
                    upd.d25 = resultado[i]["col34"] == "" || resultado[i]["col34"] == null ? 0 : resultado[i]["col34"].toString().split(".")[0];
                    upd.d26 = resultado[i]["col35"] == "" || resultado[i]["col35"] == null ? 0 : resultado[i]["col35"].toString().split(".")[0];
                    upd.d27 = resultado[i]["col36"] == "" || resultado[i]["col36"] == null ? 0 : resultado[i]["col36"].toString().split(".")[0];
                    upd.d28 = resultado[i]["col37"] == "" || resultado[i]["col37"] == null ? 0 : resultado[i]["col37"].toString().split(".")[0];
                    upd.d29 = resultado[i]["col38"] == "" || resultado[i]["col38"] == null ? 0 : resultado[i]["col38"].toString().split(".")[0];
                    upd.d30 = resultado[i]["col39"] == "" || resultado[i]["col39"] == null ? 0 : resultado[i]["col39"].toString().split(".")[0];
                    upd.d31 = resultado[i]["col40"] == "" || resultado[i]["col40"] == null ? 0 : resultado[i]["col40"].toString().split(".")[0];
                    const data = await Plan_1.Plans.update(upd.dataValues, {
                        where: [
                            {
                                id: upd.id
                            }
                        ]
                    });
                    console.log(upd);
                }
                else {
                    console.log("no existe");
                }
            }
        }
        await Plan_1.Plans.bulkCreate(pl, {
            logging: false
        });
        res.json({
            resultado,
            fecha
        });
    };
    static PlanView = async (req, res) => {
        const tenantsGacs = [];
        const tenantsIGHS = [];
        //const { fecha } = req.body || req.params
        const fecha = req.body?.fecha || req.query?.fecha;
        const shift = req.body?.shift || req.query?.shift;
        console.error("fecha: " + fecha);
        const dt = new Date((fecha ?? '2025-04-01').toString());
        dt.setDate(0);
        const inicioSiguienteMes = new Date(dt.getFullYear(), dt.getMonth() + 2, 1);
        let machines = [];
        if (req.User.PlantId == null) {
            const machine = await Index_1.Machine.findAll({
                where: [
                    {
                        status: true,
                    }
                ]
            });
            machines = machine.map(row => row.machineCode);
        }
        else {
            const machine = await Index_1.Machine.findAll({
                where: [
                    {
                        status: true,
                        PlantId: req.User?.PlantId
                    }
                ]
            });
            machines = machine.map(row => row.machineCode);
        }
        const servers = await Index_1.Codes.findAll({
            attributes: ["key", "type", 'cryServer'],
            include: [{
                    model: Index_1.Machine,
                    required: true,
                    as: "Machine",
                    where: [{
                            machineCode: {
                                [sequelize_1.Op.in]: machines
                            }
                        }],
                    attributes: [],
                }],
        });
        for (let index = 0; index < servers.length; index++) {
            try {
                if (servers[index].type == 2) {
                    if (tenantsGacs.filter(x => x.name == servers[index].name).length == 0) {
                        const cry = (0, crypto_1.decrypt)(servers[index].cryServer);
                        tenantsGacs.push({
                            name: servers[index].key,
                            host: cry.split('|')[0],
                            database: cry.split('|')[1],
                            username: "tepicsa",
                            password: "tepsa59$"
                        });
                    }
                }
                else if (servers[index].type == 1) {
                    if (tenantsIGHS.filter(x => x.name == servers[index].name).length == 0) {
                        const cryighs = (0, crypto_1.decrypt)(servers[index].cryServer);
                        const host = (0, Gnr_1.normalizes)(cryighs.split('|')[0]);
                        tenantsIGHS.push({
                            name: servers[index].key,
                            host: `IGHS-ATN-L3-02\\IGHSATNL302`,
                            database: cryighs.split('|')[1],
                            username: "LC_USR1",
                            password: "G8sfxhkM"
                        });
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        /*{
                                [Op.in]:machines
                            }*/
        const promises = tenantsGacs.map(async (t) => {
            const conn = await (0, TenantConnection_1.TenantConnection)(t);
            return (0, Gnr_1.withTimeout)(this.GetAllPiecesByMonth(conn, dt, shift), 10000 // 3 segundos max
            );
        });
        const results = await Promise.allSettled(promises);
        const data = [];
        for (let index = 0; index < results.length; index++) {
            data.push(...results[index]["value"]);
        }
        const plan = await Plan_1.Plans.findAll({
            where: {
                createdAt: {
                    [sequelize_1.Op.gte]: dt,
                    [sequelize_1.Op.lt]: inicioSiguienteMes
                },
                machine: {
                    [sequelize_1.Op.in]: machines
                },
                Shift: shift
            }
        });
        return res.json({ send: data, plan });
    };
    static GetAllPiecesByMonth = async (sequelize, fecha, shift) => {
        let hours = null;
        if (shift == 1) {
            hours = process.env.HOURSTA.split('|');
        }
        else {
            hours = process.env.HOURSTB.split('|');
        }
        const query = `
            select line_c,SUBSTRING(prodlbl_no,5,4) ShortPart, count(line_c) as total
			from insp_res
			where wrkproc_c='p2' and insp_dt>= :START and insp_dt< :ENDS ${parseInt(hours[0]) > parseInt(hours[1]) ? " AND ( DATEPART(HH,insp_dt) >= :ST OR DATEPART(HH,insp_dt)< :EN )" : " AND ( DATEPART(HH,insp_dt) >= :ST AND DATEPART(HH,insp_dt)< :EN )"}
			group by line_c,SUBSTRING(prodlbl_no,5,4) 
        `;
        console.log("hors");
        console.log(hours);
        const dt = {
            START: "",
            END: "",
            ST: hours[0],
            EN: hours[1]
        };
        if (shift == 1) {
            const data = process.env.HOURSTA.split('|');
            dt.START = (0, Gnr_1.formatDate)(fecha) + " " + data[0] + ":00:00";
            if (parseInt(data[2]) > 0) {
                const inicioSiguienteMes = new Date(fecha.getFullYear(), fecha.getMonth() + 2, 1);
                //const n = fecha.setDate(f.getDate() + 1)
                dt.END = (0, Gnr_1.formatDate)(inicioSiguienteMes) + " " + data[1] + ":00:00";
            }
            else {
                const inicioSiguienteMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 1);
                const n = inicioSiguienteMes;
                dt.END = (0, Gnr_1.formatDate)(n) + " " + data[1] + ":00:00";
            }
        }
        else {
            const data = process.env.HOURSTB.split('|');
            dt.START = (0, Gnr_1.formatDate)(fecha) + " " + data[0] + ":00:00";
            if (parseInt(data[2]) > 0) {
                const inicioSiguienteMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 1);
                //const n = fecha.setDate(fecha.getDate() + 1)
                dt.END = (0, Gnr_1.formatDate)(inicioSiguienteMes) + " " + data[1] + ":00:00";
            }
            else {
                const inicioSiguienteMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 1);
                const n = inicioSiguienteMes;
                dt.END = (0, Gnr_1.formatDate)(n) + " " + data[1] + ":00:00";
            }
        }
        /*HOURSTA=7|17|0
    HOURSTB=17|2|1
    HOURSTC=2|6|0*/
        const result = await sequelize.query(query, {
            replacements: {
                START: dt.START,
                ENDS: dt.END,
                ST: hours[0],
                EN: hours[1]
            },
            type: sequelize_1.QueryTypes.SELECT,
        });
        console.log({
            START: dt.START,
            ENDS: dt.END,
            ST: dt.ST,
            EN: dt.EN
        });
        //console.log(result)
        return result;
    };
}
exports.PlanController = PlanController;
//# sourceMappingURL=PlanController.js.map