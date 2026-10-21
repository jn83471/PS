import type { Request, Response } from "express";
import { io } from "../server";
import { Json } from "sequelize/lib/utils";
import { Machine } from "../Models/Machine";
import { Codes } from "../Models/Index";
import { DATE, json, QueryTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/db";
import { DBConfig, TenantConnection } from "../config/TenantConnection";
import type { ProductionRow } from '../types/MachineProduction'
import { decrypt } from "../Utils/crypto";
import { Plants } from "../Models/Plants";
import { formatDate, formatDateNow } from "../Utils/Gnr";

export class ReportController {
    static Report: any = async (req: Request, res: Response) => {
        const tenantsGacs: DBConfig[] = [
        ];
        const tenantsIGHS: DBConfig[] = [
        ];

        const fecha = req.params?.fecha || req.body?.fecha || req.query?.fecha;

        console.error("fecha: " + fecha)
        const dt = new Date((fecha ?? '2025-04-01').toString())
        console.log(dt)
        dt.setDate(0)
        console.log(dt)

        const inicioSiguienteMes = new Date(
            dt.getFullYear(),
            dt.getMonth() + 1,
            1
        );
        console.log(inicioSiguienteMes)
        

        let data: ProductionRow[] = [];

        const servers = await Codes.findAll({
            attributes: ["key", "type", 'cryServer'],
            include: [{
                model: Machine,
                required: true,
                as: "Machine",
                attributes: [],
            }],
        })

        

        for (let index = 0; index < servers.length; index++) {
            try {
                if (servers[index].type == 2) {
                    if (tenantsGacs?.filter(x => x.name == servers[index].name).length == 0) {
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
                    if (tenantsIGHS?.filter(x => x.name == servers[index].name).length == 0) {
                        const cryighs = decrypt(servers[index].cryServer)
                        const host = this.normalizes(cryighs.split('|')[0]);
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

        
        console.log(tenantsIGHS)
        //return res.json(tenantsIGHS)


        const promises = tenantsGacs.map(async (t) => {
            const conn = await TenantConnection(t);

            return this.withTimeout(
                this.getReportACS(conn, dt, inicioSiguienteMes),
                10000 // 3 segundos max
            );
        });
        const promisesIGHS = tenantsIGHS.map(async (t) => {
            const conn = await TenantConnection(t);

            return this.withTimeout(
                this.getReportIGHS(conn),
                10000 // 3 segundos max
            );
        });
        // return res.json(tenantsIGHS)
        const results = await Promise.allSettled(promises);
        console.log("completo")
        console.log(results)

        for (let index = 0; index < results.length; index++) {
            if (index == 0) {
                data = results[index]["value"];
            }
            else {
                const machine: ProductionRow[] = results[index]["value"];
                machine.forEach(element => {
                    if (data.filter(x => x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT).length != 0) {

                        data.map(x => {
                            if (x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT) {
                                x.PROD = x.PROD + element.PROD;
                            }
                            return x
                        })

                    }
                    else {
                        data.push(element);
                    }
                });

            }
        }
        const resultsighs = await Promise.allSettled(promisesIGHS);
        for (let index = 0; index < resultsighs.length; index++) {
            const machine: ProductionRow[] = resultsighs[index]["value"];
            machine?.forEach(element => {
                if (data.filter(x => x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT).length != 0) {

                    data.map(x => {
                        if (x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT) {
                            x.PROD = x.PROD + element.PROD;
                        }
                        return x
                    })

                }
                else {
                    data.push(element);
                }
            });
        }

        const plantMachines = await Plants.findAll({
            where: {
                status: true
            },
            include: [
                {
                    model: Machine,
                    as: "Machine",
                    required: true
                },
                {
                    model: Codes,
                    as: "Codes",
                    required: true
                }
            ]
        })

        return res.json({
            plant: plantMachines,
            data: data
        })

    }

    static IPD: any = async (req: Request, res: Response) => {
        const tenantsGacs: DBConfig[] = [
        ];
        const tenantsIGHS: DBConfig[] = [
        ];
        let data: ProductionRow[] = [];

        const servers = await Codes.findAll({
            attributes: ["key", "type", 'cryServer'],
            include: [{
                model: Machine,
                required: true,
                as: "Machine",
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
                        const host = this.normalizes(cryighs.split('|')[0]);
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
        const promises = tenantsGacs.map(async (t) => {
            const conn = await TenantConnection(t);

            return this.withTimeout(
                this.getReportAllACS(conn),
                10000
            );
        });
        const promisesIGHS = tenantsIGHS.map(async (t) => {
            const conn = await TenantConnection(t);

            return this.withTimeout(
                this.getReportAllIGHS(conn),
                10000
            );
        });

        const results = await Promise.allSettled(promises);

        for (let index = 0; index < results.length; index++) {
            if (index == 0) {
                data = results[index]["value"];
            }
            else {
                const machine: ProductionRow[] = results[index]["value"];
                machine.forEach(element => {
                    if (data.filter(x => x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT).length != 0) {

                        data.map(x => {
                            if (x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT) {
                                x.PROD = x.PROD + element.PROD;
                                x.Def = x.Def + element.Def;
                            }
                            return x
                        })

                    }
                    else {
                        data.push(element);
                    }
                });

            }
        }
        const resultsighs = await Promise.allSettled(promisesIGHS);
        for (let index = 0; index < resultsighs.length; index++) {
            const machine: ProductionRow[] = resultsighs[index]["value"];
            machine.forEach(element => {
                if (data.filter(x => x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT).length != 0) {

                    data.map(x => {
                        if (x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT) {
                            x.PROD = x.PROD + element.PROD;
                            x.Def = x.Def + element.Def;
                        }
                        return x
                    })

                }
                else {
                    data.push(element);
                }
            });
        }
        const plantMachines = await Plants.findAll({
            where: {
                status: true
            },
            include: [
                {
                    model: Machine,
                    as: "Machine",
                    required: true
                },
                {
                    model: Codes,
                    as: "Codes",
                    required: true
                }
            ]
        })

        const dt = [];
        plantMachines.map(x => {
            const machines = x.Machine.map(y => y.machineCode);

            const prod = data.filter(x => machines.includes(x.line_c)).reduce((sum, x) => sum + x.PROD, 0)
            const def = data.filter(x => machines.includes(x.line_c)).reduce((sum, x) => sum + x.Def, 0)
            dt.push({
                name: x.name,
                Prod: prod,
                Def: def,
                IPD: (def / (prod + def)) * 100
            })
        })

        return res.json(dt)
    }
    static IPDByPlant: any = async (req: Request, res: Response) => {
        const { Plantid } = req.params
        const tenantsGacs: DBConfig[] = [
        ];
        const tenantsIGHS: DBConfig[] = [
        ];
        let data: ProductionRow[] = [];

        const servers = await Codes.findAll({
            attributes: ["key", "type", 'cryServer'],
            include: [{
                model: Machine,
                required: true,
                as: "Machine",
                attributes: [],
                where: [{
                    PlantId: Plantid
                }]
            }/*,
            {
                model: Plants,
                required: true,
                as: "plant",
                where:{
                  id:  Plantid
                },
                attributes: [],
            }*/
            ],
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
                        const host = this.normalizes(cryighs.split('|')[0]);
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
        const promises = tenantsGacs.map(async (t) => {
            const conn = await TenantConnection(t);

            return this.withTimeout(
                this.getReportAllByYearACS(conn),
                10000
            );
        });
        const promisesIGHS = tenantsIGHS.map(async (t) => {
            const conn = await TenantConnection(t);

            return this.withTimeout(
                this.getReportAllByYearIGHS(conn),
                10000
            );
        });

        const results = await Promise.allSettled(promises);

        for (let index = 0; index < results.length; index++) {
            if (index == 0) {
                data = results[index]["value"];
            }
            else {
                const machine: ProductionRow[] = results[index]["value"];
                machine.forEach(element => {
                    if (data.filter(x => x.line_c == element.line_c && x.MONTH == element.MONTH && x.DAY == element.DAY && x.SHIFT == element.SHIFT).length != 0) {

                        data.map(x => {
                            if (x.line_c == element.line_c && x.MONTH == element.MONTH && x.DAY == element.DAY && x.SHIFT == element.SHIFT) {
                                x.PROD = x.PROD + element.PROD;
                                x.Def = x.Def + element.Def;
                            }
                            return x
                        })

                    }
                    else {
                        data.push(element);
                    }
                });

            }
        }
        const resultsighs = await Promise.allSettled(promisesIGHS);
        for (let index = 0; index < resultsighs.length; index++) {
            const machine: ProductionRow[] = resultsighs[index]["value"];
            machine.forEach(element => {
                if (data.filter(x => x.line_c == element.line_c && x.MONTH == element.MONTH && x.DAY == element.DAY && x.SHIFT == element.SHIFT).length != 0) {

                    data.map(x => {
                        if (x.line_c == element.line_c && x.MONTH == element.MONTH && x.DAY == element.DAY && x.SHIFT == element.SHIFT) {
                            x.PROD = x.PROD + element.PROD;
                            x.Def = x.Def + element.Def;
                        }
                        return x
                    })

                }
                else {
                    data.push(element);
                }
            });
        }
        const plantMachines = await Plants.findAll({
            where: {
                status: true,
                id: Plantid
            },
            include: [
                {
                    model: Machine,
                    as: "Machine",
                    required: true
                },
                {
                    model: Codes,
                    as: "Codes",
                    required: true
                }
            ]
        })

        const dt = [];
        plantMachines.map(x => {
            const machines = x.Machine.map(y => y.machineCode);
            for (let index = 0; index <= new Date().getMonth(); index++) {
                const prod = data.filter(x => x.MONTH == (index + 1)).reduce((sum, x) => sum + x.PROD, 0)
                const def = data.filter(x => x.MONTH == (index + 1)).reduce((sum, x) => sum + x.Def, 0)
                dt.push({
                    name: x.name,
                    Prod: prod + def,
                    MONTH: index + 1,
                    Def: def,
                    IPD: (def / (prod + def)) * 100
                })

            }



        })

        return res.json(dt)
    }

    static normalizes = (text: string) => {
        return text.replace(/\\+/g, "\\");
    };

    static getReportACS = async (sequelize: Sequelize, fecha: Date, fin: Date) => {
        const dt = {
            START: "",
            END: ""
        }
        
        const data = process.env.HOURSTA.split('|')
        dt.START = formatDate(new Date(fecha)) + " " + data[0] + ":00:00"
        dt.END = formatDate(new Date(fin)) + " " + data[0] + ":00:00"

        console.log({
            fecha: dt.START,
            fin: dt.END,
        })

        const query = `
             SELECT line_c,DAY,SHIFT,COUNT(SHIFT) AS PROD  FROM(
                select line_c,
                    CASE WHEN DATEPART(HH,insp_dt)<7 THEN DATEPART(DAY,DATEADD(DAY,-1,insp_dt)) else DATEPART(DAY,insp_dt) end AS DAY,
                    CASE WHEN DATEPART(HH,insp_dt)<2 OR DATEPART(HH,insp_dt)>=17 THEN 2 WHEN DATEPART(HH,insp_dt)>=7 THEN 1 ELSE 3 END AS SHIFT
                from insp_res
                where insp_dt>= :START and insp_dt< :ENDS and wrkproc_c='P2'
            ) TEMP1
            WHERE DAY>0
            GROUP BY line_c,DAY,SHIFT
            ORDER BY line_c,DAY,SHIFT
        `;

        const result = await sequelize.query<{
            line_c: string;
            DAY: number;
            SHIFT: number;
            PROD: number;
        }>(query, {
            replacements: {
                START: dt.START,
                ENDS: dt.END,
            },
            type: QueryTypes.SELECT,
        });


        //console.log(result)
        return result
    }

    static getReportAllACS = async (sequelize: Sequelize) => {
        const query = `
             SELECT TEMP1.line_c,TEMP1.DAY,TEMP1.SHIFT,COUNT(TEMP1.SHIFT) AS PROD,ISNULL(MAX(TEMP2.PROD),0) Def  FROM(
            select line_c,
                    CASE WHEN DATEPART(HH,insp_dt)<7 THEN DATEPART(DAY,DATEADD(DAY,-1,insp_dt)) else DATEPART(DAY,insp_dt) end AS DAY,
                    CASE WHEN DATEPART(HH,insp_dt)<2 OR DATEPART(HH,insp_dt)>=17 THEN 2 WHEN DATEPART(HH,insp_dt)>=7 THEN 1 ELSE 3 END AS SHIFT
                from insp_res
                where insp_dt>='2026-05-01 7:00:00' and wrkproc_c='p2'
				) TEMP1

			LEFT JOIN(
			SELECT line_c,DAY,SHIFT,COUNT(SHIFT) AS PROD  FROM(
			SELECT D.line_c,
			CASE WHEN DATEPART(HH,insp_dt)<7 THEN DATEPART(DAY,DATEADD(DAY,-1,insp_dt)) else DATEPART(DAY,insp_dt) end AS DAY,
			CASE WHEN DATEPART(HH,insp_dt)<2 OR DATEPART(HH,insp_dt)>=17 THEN 2 WHEN DATEPART(HH,insp_dt)>=7 THEN 1 ELSE 3 END AS SHIFT
			  FROM defect_res D
			WHERE insp_dt>='2026-05-01 7:00:00') AS TMPDef
			GROUP BY line_c,DAY,SHIFT
			) TEMP2 ON TEMP2.line_c= TEMP1.line_c AND TEMP2.SHIFT=TEMP1.SHIFT AND TEMP2.DAY=TEMP1.DAY
            WHERE TEMP1.DAY>0
            GROUP BY TEMP1.line_c,TEMP1.DAY,TEMP1.SHIFT
            ORDER BY TEMP1.line_c,TEMP1.DAY,TEMP1.SHIFT
        `;

        const result = await sequelize.query<{
            line_c: string;
            DAY: number;
            SHIFT: number;
            PROD: number;
        }>(query, {
            type: QueryTypes.SELECT,
        });


        //console.log(result)
        return result
    }
    static getReportAllByYearACS = async (sequelize: Sequelize) => {
        const query = `
             SELECT TEMP1.line_c,TEMP1.MONTH,TEMP1.DAY,TEMP1.SHIFT,COUNT(TEMP1.SHIFT) AS PROD,ISNULL(MAX(TEMP2.PROD),0) Def  FROM(
select line_c,
CASE WHEN DATEPART(HH,insp_dt)<7 THEN DATEPART(MONTH,DATEADD(DAY,-1,insp_dt)) else DATEPART(MONTH,insp_dt) end AS MONTH,
                    CASE WHEN DATEPART(HH,insp_dt)<7 THEN DATEPART(DAY,DATEADD(DAY,-1,insp_dt)) else DATEPART(DAY,insp_dt) end AS DAY,
                    CASE WHEN DATEPART(HH,insp_dt)<2 OR DATEPART(HH,insp_dt)>=17 THEN 2 WHEN DATEPART(HH,insp_dt)>=7 THEN 1 ELSE 3 END AS SHIFT
                from insp_res
                where insp_dt>='2026-01-01 7:00:00' and wrkproc_c='p2'
				) TEMP1

			LEFT JOIN(
			SELECT line_c,MONTH,DAY,SHIFT,COUNT(SHIFT) AS PROD  FROM(
			SELECT D.line_c,
			CASE WHEN DATEPART(HH,insp_dt)<7 THEN DATEPART(MONTH,DATEADD(DAY,-1,insp_dt)) else DATEPART(MONTH,insp_dt) end AS MONTH,
			CASE WHEN DATEPART(HH,insp_dt)<7 THEN DATEPART(DAY,DATEADD(DAY,-1,insp_dt)) else DATEPART(DAY,insp_dt) end AS DAY,
			CASE WHEN DATEPART(HH,insp_dt)<2 OR DATEPART(HH,insp_dt)>=17 THEN 2 WHEN DATEPART(HH,insp_dt)>=7 THEN 1 ELSE 3 END AS SHIFT
			  FROM defect_res D
			WHERE insp_dt>='2026-01-01 7:00:00') AS TMPDef
			GROUP BY line_c,DAY,SHIFT,MONTH
			) TEMP2 ON TEMP2.line_c= TEMP1.line_c AND TEMP2.SHIFT=TEMP1.SHIFT AND TEMP2.DAY=TEMP1.DAY AND TEMP2.MONTH=TEMP1.MONTH
            WHERE TEMP1.DAY>0
            GROUP BY TEMP1.line_c,TEMP1.DAY,TEMP1.SHIFT,TEMP1.MONTH
            ORDER BY TEMP1.line_c,TEMP1.MONTH,TEMP1.DAY,TEMP1.SHIFT
        `;

        const result = await sequelize.query<{
            line_c: string;
            DAY: number;
            SHIFT: number;
            PROD: number;
        }>(query, {
            type: QueryTypes.SELECT,
        });


        //console.log(result)
        return result
    }



    static getReportIGHS = async (sequelize: Sequelize) => {
        const query = `
            SELECT line_c,DAY,SHIFT,COUNT(SHIFT) AS PROD  FROM(
                SELECT line_cd AS line_c,
                    CASE WHEN DATEPART(HH,insp_st_dtm)<7 THEN DATEPART(DAY,DATEADD(DAY,-1,insp_st_dtm)) else DATEPART(DAY,insp_st_dtm) end AS DAY,
                    CASE WHEN DATEPART(HH,insp_st_dtm)<2 OR DATEPART(HH,insp_st_dtm)>=17 THEN 2 WHEN DATEPART(HH,insp_st_dtm)>=7 THEN 1 ELSE 3 END AS SHIFT
				FROM c2v_assy_insp_rslt RS WITH(NOLOCK)
				WHERE PRCS_CD='G5170' AND insp_st_dtm>='2026-05-01  7:00:00'
            ) TEMP1
            WHERE DAY>0
            GROUP BY line_c,DAY,SHIFT
            ORDER BY line_c,DAY,SHIFT
        `;

        const result = await sequelize.query<{
            line_c: string;
            DAY: number;
            SHIFT: number;
            PROD: number;
        }>(query, {
            type: QueryTypes.SELECT,
        });


        //console.log(result)
        return result
    }

    static getReportAllIGHS = async (sequelize: Sequelize) => {
        const query = `
             SELECT TEMP1.line_c,TEMP1.DAY,TEMP1.SHIFT,COUNT(TEMP1.SHIFT) AS PROD,ISNULL(MAX(TEMP2.PROD),0) Def  FROM(
                SELECT line_cd AS line_c,
                    CASE WHEN DATEPART(HH,insp_st_dtm)<7 THEN DATEPART(DAY,DATEADD(DAY,-1,insp_st_dtm)) else DATEPART(DAY,insp_st_dtm) end AS DAY,
                    CASE WHEN DATEPART(HH,insp_st_dtm)<2 OR DATEPART(HH,insp_st_dtm)>=17 THEN 2 WHEN DATEPART(HH,insp_st_dtm)>=7 THEN 1 ELSE 3 END AS SHIFT
				FROM c2v_assy_insp_rslt RS WITH(NOLOCK)
				WHERE PRCS_CD='G5170' AND insp_st_dtm>='2026-05-01  7:00:00'
            ) TEMP1
			LEFT JOIN( 
			SELECT line_c,DAY,SHIFT,COUNT(SHIFT) AS PROD  FROM(
			select line_cd AS line_c,
			CASE WHEN DATEPART(HH,B.pms_i_ymd)<7 THEN DATEPART(DAY,DATEADD(DAY,-1,B.pms_i_ymd)) else DATEPART(DAY,B.pms_i_ymd) end AS DAY,
            CASE WHEN DATEPART(HH,B.pms_i_ymd)<2 OR DATEPART(HH,B.pms_i_ymd)>=17 THEN 2 WHEN DATEPART(HH,B.pms_i_ymd)>=7 THEN 1 ELSE 3 END AS SHIFT
FROM
					c2e_assy_insp_rslt_dfct_rslt_map A
				INNER JOIN c2e_assy_insp_rslt B ON A.assy_insp_rslt_id= B.assy_insp_rslt_id AND A.site_cd=B.site_cd
				WHERE B.pms_i_ymd>='2026-05-01 7:00:00'
				) AS TMPDef
			GROUP BY line_c,DAY,SHIFT

				) TEMP2 ON TEMP2.line_c=TEMP1.line_c AND TEMP2.SHIFT=TEMP1.SHIFT AND TEMP2.DAY=TEMP1.DAY
            WHERE TEMP1.DAY>0
            GROUP BY TEMP1.line_c,TEMP1.DAY,TEMP1.SHIFT
            ORDER BY TEMP1.line_c,TEMP1.DAY,TEMP1.SHIFT
 
        `;

        const result = await sequelize.query<{
            line_c: string;
            DAY: number;
            SHIFT: number;
            PROD: number;
        }>(query, {
            type: QueryTypes.SELECT,
        });


        //console.log(result)
        return result
    }

    static getReportAllByYearIGHS = async (sequelize: Sequelize) => {
        const query = `
            SELECT TEMP1.line_c,TEMP1.MONTH,TEMP1.DAY,TEMP1.SHIFT,COUNT(TEMP1.SHIFT) AS PROD,ISNULL(MAX(TEMP2.PROD),0) Def  FROM(
                SELECT line_cd AS line_c,
							CASE WHEN DATEPART(HH,insp_st_dtm)<7 THEN DATEPART(MONTH,DATEADD(DAY,-1,insp_st_dtm)) else DATEPART(MONTH,insp_st_dtm) end AS MONTH,
                    CASE WHEN DATEPART(HH,insp_st_dtm)<7 THEN DATEPART(DAY,DATEADD(DAY,-1,insp_st_dtm)) else DATEPART(DAY,insp_st_dtm) end AS DAY,
                    CASE WHEN DATEPART(HH,insp_st_dtm)<2 OR DATEPART(HH,insp_st_dtm)>=17 THEN 2 WHEN DATEPART(HH,insp_st_dtm)>=7 THEN 1 ELSE 3 END AS SHIFT
				FROM c2v_assy_insp_rslt RS WITH(NOLOCK)
				WHERE PRCS_CD='G5170' AND insp_st_dtm>='2026-01-01  7:00:00'
            ) TEMP1
			LEFT JOIN( 
			SELECT line_c,MONTH,DAY,SHIFT,COUNT(SHIFT) AS PROD  FROM(
			select line_cd AS line_c,
			CASE WHEN DATEPART(HH,B.pms_i_ymd)<7 THEN DATEPART(MONTH,DATEADD(DAY,-1,B.pms_i_ymd)) else DATEPART(MONTH,B.pms_i_ymd) end AS MONTH,
			CASE WHEN DATEPART(HH,B.pms_i_ymd)<7 THEN DATEPART(DAY,DATEADD(DAY,-1,B.pms_i_ymd)) else DATEPART(DAY,B.pms_i_ymd) end AS DAY,
            CASE WHEN DATEPART(HH,B.pms_i_ymd)<2 OR DATEPART(HH,B.pms_i_ymd)>=17 THEN 2 WHEN DATEPART(HH,B.pms_i_ymd)>=7 THEN 1 ELSE 3 END AS SHIFT
FROM
					c2e_assy_insp_rslt_dfct_rslt_map A
				INNER JOIN c2e_assy_insp_rslt B ON A.assy_insp_rslt_id= B.assy_insp_rslt_id AND A.site_cd=B.site_cd
				WHERE B.pms_i_ymd>='2026-01-01 7:00:00'
				) AS TMPDef
			GROUP BY line_c,DAY,SHIFT,MONTH

				) TEMP2 ON TEMP2.line_c=TEMP1.line_c AND TEMP2.SHIFT=TEMP1.SHIFT AND TEMP2.DAY=TEMP1.DAY AND TEMP2.MONTH=TEMP1.MONTH
            WHERE TEMP1.DAY>0
            GROUP BY TEMP1.line_c,TEMP1.DAY,TEMP1.MONTH,TEMP1.SHIFT
            ORDER BY TEMP1.line_c,TEMP1.DAY,TEMP1.MONTH,TEMP1.SHIFT
 
        `;

        const result = await sequelize.query<{
            line_c: string;
            DAY: number;
            SHIFT: number;
            PROD: number;
        }>(query, {
            type: QueryTypes.SELECT,
        });


        //console.log(result)
        return result
    }

    static withTimeout = (promise: Promise<any>, ms: number) => {
        return Promise.race([
            promise,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout")), ms)
            ),
        ]);
    };

}