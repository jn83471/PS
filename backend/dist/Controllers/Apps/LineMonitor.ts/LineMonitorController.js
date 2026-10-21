"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineMonitorController = void 0;
const Machine_1 = require("../../../Models/Machine");
const TenantConnection_1 = require("../../../config/TenantConnection");
const Codes_1 = require("../../../Models/Codes");
const sequelize_1 = require("sequelize");
const crypto_1 = require("../../../Utils/crypto");
const Gnr_1 = require("../../../Utils/Gnr");
const Index_1 = require("../../../Models/Index");
const SMHCAS_1 = require("../../../Models/SMHCAS");
class LineMonitorController {
    static Index = async (req, res) => {
        try {
            const fecha = req.body?.fecha || req.query?.fecha;
            const shift = req.body?.shift || req.query?.shift;
            let machines = [];
            let plants = [];
            const tenantsGacs = [];
            const tenantsIGHS = [];
            if (req.User.PlantId == null) {
                const machine = await Machine_1.Machine.findAll({
                    where: [
                        {
                            status: true,
                        }
                    ]
                });
                machines = machine.map(row => row.machineCode);
                plants = await Index_1.Plants.findAll({
                    where: [
                        {
                            status: true
                        }
                    ],
                    include: [
                        {
                            model: Machine_1.Machine,
                            as: "Machine"
                        }
                    ]
                });
            }
            else {
                const machine = await Machine_1.Machine.findAll({
                    where: [
                        {
                            status: true,
                            PlantId: req.User?.PlantId
                        }
                    ]
                });
                machines = machine.map(row => row.machineCode);
                const pl = await Index_1.Plants.findOne({
                    where: {
                        id: req.User.PlantId
                    },
                    include: [
                        {
                            model: Machine_1.Machine,
                            as: "Machine"
                        }
                    ]
                });
                plants = [pl];
            }
            const servers = await Codes_1.Codes.findAll({
                attributes: ["key", "type", 'cryServer'],
                include: [{
                        model: Machine_1.Machine,
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
            const promises = tenantsGacs.map(async (t) => {
                const conn = await (0, TenantConnection_1.TenantConnection)(t);
                return (0, Gnr_1.withTimeout)(this.GetKmh(conn, new Date(fecha), shift), 10000 // 3 segundos max
                );
            });
            const results = await Promise.allSettled(promises);
            console.log(results);
            const data = [];
            for (let index = 0; index < results.length; index++) {
                data.push(...results[index]["value"]);
            }
            const smhcas = await SMHCAS_1.Smhcas.findAll();
            return res.json({ data, plants, smhcas });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send("no se ha podido encontrar la informacion");
        }
    };
    static GetKmh = async (sequelize, fecha, shift) => {
        let hours = null;
        if (shift == 1) {
            hours = process.env.HOURSTA.split('|');
        }
        else {
            hours = process.env.HOURSTB.split('|');
        }
        const query = `
            SELECT L.line_c+' - '+ L.line_nm AS LineId,product_no AS SewsPartNumber,
			SUBSTRING(prodlbl_no , 5, 4) AS ShortPartNumber,
			case when DATEPART(HH, insp_dt ) between 0 and 5 then  (DATEPART(HH, I.insp_dt )+24) else DATEPART(HH, insp_dt ) end AS HourId,COUNT(product_no) AS Produced,
			ISNULL(DEF.Produced,0) Defects
	  FROM insp_res I
	  INNER JOIN line_mst L ON L.line_c=I.line_c
	  LEFT JOIN (SELECT L.line_c,
		case when DATEPART(HH, d.ent_dt ) between 0 and 5 then  (DATEPART(HH, D.ent_dt )+24) else DATEPART(HH, D.ent_dt ) end AS defects,
		count(*) AS Produced
		FROM defect_res D
		INNER JOIN line_mst L ON L.line_c=D.line_c
		WHERE D.ent_dt BETWEEN  :START AND :ENDS
		group by L.line_c, L.line_nm,DATEPART(HH,  D.ent_dt)
		) DEF ON DEF.line_c=L.line_c AND DEF.defects=(case when DATEPART(HH, insp_dt ) between 0 and 5 then  (DATEPART(HH, I.insp_dt )+24) else DATEPART(HH, insp_dt ) end)
	  where insp_dt BETWEEN :START AND :ENDS and wrkproc_c='P2'
	  GROUP BY  L.line_c,L.line_nm,product_no,
			SUBSTRING(prodlbl_no , 5, 4),
			DATEPART(HH,  insp_dt),DEF.Produced
        `;
        console.log("hors");
        console.log(fecha);
        const dt = {
            START: "",
            END: "",
        };
        if (shift == 0 || shift == undefined) {
            console.log("paso a turno 0");
            const data = process.env.HOURSTA.split('|');
            const sigday = process.env.HOURSTC.split('|');
            dt.START = (0, Gnr_1.formatDateNow)(fecha) + " " + data[0].toString() + ":00:00";
            const iniciodia = fecha;
            iniciodia.setDate(iniciodia.getDate() + 1);
            //const n = fecha.setDate(f.getDate() + 1)
            dt.END = (0, Gnr_1.formatDateNow)(iniciodia) + " " + sigday[1] + ":00:00";
        }
        else if (shift == 1) {
            const data = process.env.HOURSTA.split('|');
            dt.START = (0, Gnr_1.formatDateNow)(fecha) + " " + data[0] + ":00:00";
            if (parseInt(data[2]) > 0) {
                const iniciodia = fecha;
                iniciodia.setDate(iniciodia.getDate() + 1);
                //const n = fecha.setDate(f.getDate() + 1)
                dt.END = (0, Gnr_1.formatDateNow)(iniciodia) + " " + data[1] + ":00:00";
            }
            else {
                const inicioSiguienteMes = fecha;
                const n = inicioSiguienteMes;
                dt.END = (0, Gnr_1.formatDateNow)(n) + " " + data[1] + ":00:00";
            }
        }
        else if (shift == 2) {
            const data = process.env.HOURSTB.split('|');
            dt.START = (0, Gnr_1.formatDateNow)(fecha) + " " + data[0] + ":00:00";
            if (parseInt(data[2]) > 0) {
                const iniciodia = fecha;
                iniciodia.setDate(iniciodia.getDate() + 1);
                //const n = fecha.setDate(f.getDate() + 1)
                dt.END = (0, Gnr_1.formatDateNow)(iniciodia) + " " + data[1] + ":00:00";
            }
            else {
                const inicioSiguienteMes = fecha;
                const n = inicioSiguienteMes;
                dt.END = (0, Gnr_1.formatDateNow)(n) + " " + data[1] + ":00:00";
            }
        }
        else {
            const data = process.env.HOURSTC.split('|');
            if (parseInt(data[3]) > 0) {
                fecha.setDate(fecha.getDate() + 1);
            }
            dt.START = (0, Gnr_1.formatDateNow)(fecha) + " " + data[0] + ":00:00";
            if (parseInt(data[2]) > 0) {
                const iniciodia = fecha;
                iniciodia.setDate(iniciodia.getDate() + 1);
                //const n = fecha.setDate(f.getDate() + 1)
                dt.END = (0, Gnr_1.formatDateNow)(iniciodia) + " " + data[1] + ":00:00";
            }
            else {
                const inicioSiguienteMes = fecha;
                const n = inicioSiguienteMes;
                dt.END = (0, Gnr_1.formatDateNow)(n) + " " + data[1] + ":00:00";
            }
        }
        /*HOURSTA=7|17|0
    HOURSTB=17|2|1
    HOURSTC=2|6|0*/
        const result = await sequelize.query(query, {
            replacements: {
                START: dt.START,
                ENDS: dt.END
            },
            type: sequelize_1.QueryTypes.SELECT,
        });
        console.log({
            START: dt.START,
            ENDS: dt.END,
            shift
        });
        //console.log(result)
        return result;
    };
}
exports.LineMonitorController = LineMonitorController;
//# sourceMappingURL=LineMonitorController.js.map