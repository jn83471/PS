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

export class LineMonitorController {
    static Index: any = async (req: Request, res: Response) => {
        try {
            const fecha = req.body?.fecha || req.query?.fecha;
            const shift = req.body?.shift || req.query?.shift;

            let machines = [];
            let plants = [];
            const tenantsGacs: DBConfig[] = [
            ];
            const tenantsIGHS: DBConfig[] = [
            ];
            if (req.User.PlantId == null) {
                const machine = await Machine.findAll({
                    where: [
                        {
                            status: true,
                        }
                    ]
                })
                machines = machine.map(row => row.machineCode);
                plants = await Plants.findAll({
                    where: [
                        {
                            status: true
                        }
                    ],
                    include: [
                        {
                            model: Machine,
                            as: "Machine",
                            where:{
                                status: true,
                            }
                        }
                    ]
                })
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
                const pl = await Plants.findOne({
                    where: {
                        id: req.User.PlantId
                    },
                    include: [
                        {
                            model: Machine,
                            as: "Machine",
                            where:{
                                status: true,
                            }
                        }
                    ]
                })
                plants = [pl]
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

            const serversTentant: DBConfig[] = [];

            for (let index = 0; index < servers.length; index++) {
                try {
                    if (servers[index].type == 2) {
                        if (tenantsGacs.filter(x => x.name == servers[index].name).length == 0) {
                            const cry = decrypt(servers[index].cryServer)
                            if (!serversTentant.find(x => x.host == cry.split('|')[0] && x.database == cry.split('|')[1])) {
                                tenantsGacs.push({
                                    name: servers[index].key,
                                    host: cry.split('|')[0],
                                    database: cry.split('|')[1],
                                    username: "tepicsa",
                                    password: "tepsa59$"
                                })
                                serversTentant.push({
                                    name: servers[index].key,
                                    host: cry.split('|')[0],
                                    database: cry.split('|')[1],
                                    username: "tepicsa",
                                    password: "tepsa59$"
                                })
                            }

                        }

                    }
                    else if (servers[index].type == 1) {
                        if (tenantsIGHS.filter(x => x.name == servers[index].name).length == 0) {
                            const cryighs = decrypt(servers[index].cryServer)
                            const host = normalizes(cryighs.split('|')[0]);
                            if (!serversTentant.find(x => x.host == `IGHS-ATN-L3-02\\IGHSATNL302` && x.database == cryighs.split('|')[1])) {

                                tenantsIGHS.push({
                                    name: servers[index].key,
                                    host: `IGHS-ATN-L3-02\\IGHSATNL302`,
                                    database: cryighs.split('|')[1],
                                    username: "LC_USR1",
                                    password: "G8sfxhkM"
                                })
                                serversTentant.push({
                                    name: servers[index].key,
                                    host: `IGHS-ATN-L3-02\\IGHSATNL302`,
                                    database: cryighs.split('|')[1],
                                    username: "tepicsa",
                                    password: "tepsa59$"
                                })
                            }
                        }

                    }
                } catch (error) {
                    console.log(error)
                }
            }
            console.log(tenantsGacs)

            const promises = tenantsGacs.map(async (t) => {
                const conn = await TenantConnection(t);

                return withTimeout(
                    this.GetKmh(conn, new Date(fecha), shift),
                    10000 // 3 segundos max
                );
            });

            const results = await Promise.allSettled(promises);
            console.log(results)
            const data = []

            for (let index = 0; index < results.length; index++) {
                data.push(...results[index]["value"]);

            }

            const smhcas = await Smhcas.findAll()


            return res.json({ data, plants, smhcas })
        } catch (error) {
            console.log(error)
            return res.status(500).send("no se ha podido encontrar la informacion")

        }


    }
    static GetKmh = async (sequelize: Sequelize, fecha: Date, shift: number) => {
        let hours = null
        if (shift == 1) {
            hours = process.env.HOURSTA.split('|')
        }
        else {
            hours = process.env.HOURSTB.split('|')
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
        console.log("hors")
        console.log(fecha)
        const dt = {
            START: "",
            END: "",
        }
        if (shift == 0 || shift == undefined) {
            console.log("paso a turno 0")
            const data = process.env.HOURSTA.split('|')
            const sigday = process.env.HOURSTC.split('|')

            dt.START = formatDateNow(fecha) + " " + data[0].toString() + ":00:00"
            const iniciodia = fecha
            iniciodia.setDate(iniciodia.getDate() + 1)
            //const n = fecha.setDate(f.getDate() + 1)
            dt.END = formatDateNow(iniciodia) + " " + sigday[1] + ":00:00"

        }
        else if (shift == 1) {
            const data = process.env.HOURSTA.split('|')

            dt.START = formatDateNow(fecha) + " " + data[0] + ":00:00"
            if (parseInt(data[2]) > 0) {
                const iniciodia = fecha
                iniciodia.setDate(iniciodia.getDate() + 1)
                //const n = fecha.setDate(f.getDate() + 1)
                dt.END = formatDateNow(iniciodia) + " " + data[1] + ":00:00"
            }
            else {
                const inicioSiguienteMes = fecha
                const n = inicioSiguienteMes
                dt.END = formatDateNow(n) + " " + data[1] + ":00:00"
            }
        }
        else if (shift == 2) {
            const data = process.env.HOURSTB.split('|')
            dt.START = formatDateNow(fecha) + " " + data[0] + ":00:00"
            if (parseInt(data[2]) > 0) {
                const iniciodia = fecha
                iniciodia.setDate(iniciodia.getDate() + 1)
                //const n = fecha.setDate(f.getDate() + 1)
                dt.END = formatDateNow(iniciodia) + " " + data[1] + ":00:00"
            }
            else {
                const inicioSiguienteMes = fecha
                const n = inicioSiguienteMes
                dt.END = formatDateNow(n) + " " + data[1] + ":00:00"
            }
        }
        else {
            const data = process.env.HOURSTC.split('|')
            if (parseInt(data[3]) > 0) {
                fecha.setDate(fecha.getDate() + 1)
            }
            dt.START = formatDateNow(fecha) + " " + data[0] + ":00:00"
            if (parseInt(data[2]) > 0) {
                const iniciodia = fecha
                iniciodia.setDate(iniciodia.getDate() + 1)
                //const n = fecha.setDate(f.getDate() + 1)
                dt.END = formatDateNow(iniciodia) + " " + data[1] + ":00:00"
            }
            else {
                const inicioSiguienteMes = fecha
                const n = inicioSiguienteMes
                dt.END = formatDateNow(n) + " " + data[1] + ":00:00"
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
                ENDS: dt.END
            },
            type: QueryTypes.SELECT,
        });

        console.log({
            START: dt.START,
            ENDS: dt.END,
            shift
        })


        //console.log(result)
        return result
    }


}