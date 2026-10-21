"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const Machine_1 = require("../Models/Machine");
const Index_1 = require("../Models/Index");
const sequelize_1 = require("sequelize");
const TenantConnection_1 = require("../config/TenantConnection");
const crypto_1 = require("../Utils/crypto");
const Plants_1 = require("../Models/Plants");
class ReportController {
    static Report = async (req, res) => {
        const tenantsGacs = [];
        const tenantsIGHS = [];
        let data = [];
        const servers = await Index_1.Codes.findAll({
            attributes: ["key", "type", 'cryServer'],
            include: [{
                    model: Machine_1.Machine,
                    required: true,
                    as: "Machine",
                    attributes: [],
                }],
        });
        for (let index = 0; index < servers.length; index++) {
            try {
                if (servers[index].type == 2) {
                    if (tenantsGacs?.filter(x => x.name == servers[index].name).length == 0) {
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
                    if (tenantsIGHS?.filter(x => x.name == servers[index].name).length == 0) {
                        const cryighs = (0, crypto_1.decrypt)(servers[index].cryServer);
                        const host = this.normalizes(cryighs.split('|')[0]);
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
        console.log(tenantsIGHS);
        //return res.json(tenantsIGHS)
        const promises = tenantsGacs.map(async (t) => {
            const conn = await (0, TenantConnection_1.TenantConnection)(t);
            return this.withTimeout(this.getReportACS(conn), 10000 // 3 segundos max
            );
        });
        const promisesIGHS = tenantsIGHS.map(async (t) => {
            const conn = await (0, TenantConnection_1.TenantConnection)(t);
            return this.withTimeout(this.getReportIGHS(conn), 10000 // 3 segundos max
            );
        });
        // return res.json(tenantsIGHS)
        const results = await Promise.allSettled(promises);
        for (let index = 0; index < results.length; index++) {
            if (index == 0) {
                data = results[index]["value"];
            }
            else {
                const machine = results[index]["value"];
                machine.forEach(element => {
                    if (data.filter(x => x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT).length != 0) {
                        data.map(x => {
                            if (x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT) {
                                x.PROD = x.PROD + element.PROD;
                            }
                            return x;
                        });
                    }
                    else {
                        data.push(element);
                    }
                });
            }
        }
        const resultsighs = await Promise.allSettled(promisesIGHS);
        for (let index = 0; index < resultsighs.length; index++) {
            const machine = resultsighs[index]["value"];
            machine?.forEach(element => {
                if (data.filter(x => x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT).length != 0) {
                    data.map(x => {
                        if (x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT) {
                            x.PROD = x.PROD + element.PROD;
                        }
                        return x;
                    });
                }
                else {
                    data.push(element);
                }
            });
        }
        const plantMachines = await Plants_1.Plants.findAll({
            where: {
                status: true
            },
            include: [
                {
                    model: Machine_1.Machine,
                    as: "Machine",
                    required: true
                },
                {
                    model: Index_1.Codes,
                    as: "Codes",
                    required: true
                }
            ]
        });
        return res.json({
            plant: plantMachines,
            data: data
        });
    };
    static IPD = async (req, res) => {
        const tenantsGacs = [];
        const tenantsIGHS = [];
        let data = [];
        const servers = await Index_1.Codes.findAll({
            attributes: ["key", "type", 'cryServer'],
            include: [{
                    model: Machine_1.Machine,
                    required: true,
                    as: "Machine",
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
                        const host = this.normalizes(cryighs.split('|')[0]);
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
            return this.withTimeout(this.getReportAllACS(conn), 10000);
        });
        const promisesIGHS = tenantsIGHS.map(async (t) => {
            const conn = await (0, TenantConnection_1.TenantConnection)(t);
            return this.withTimeout(this.getReportAllIGHS(conn), 10000);
        });
        const results = await Promise.allSettled(promises);
        for (let index = 0; index < results.length; index++) {
            if (index == 0) {
                data = results[index]["value"];
            }
            else {
                const machine = results[index]["value"];
                machine.forEach(element => {
                    if (data.filter(x => x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT).length != 0) {
                        data.map(x => {
                            if (x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT) {
                                x.PROD = x.PROD + element.PROD;
                                x.Def = x.Def + element.Def;
                            }
                            return x;
                        });
                    }
                    else {
                        data.push(element);
                    }
                });
            }
        }
        const resultsighs = await Promise.allSettled(promisesIGHS);
        for (let index = 0; index < resultsighs.length; index++) {
            const machine = resultsighs[index]["value"];
            machine.forEach(element => {
                if (data.filter(x => x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT).length != 0) {
                    data.map(x => {
                        if (x.line_c == element.line_c && x.DAY == element.DAY && x.SHIFT == element.SHIFT) {
                            x.PROD = x.PROD + element.PROD;
                            x.Def = x.Def + element.Def;
                        }
                        return x;
                    });
                }
                else {
                    data.push(element);
                }
            });
        }
        const plantMachines = await Plants_1.Plants.findAll({
            where: {
                status: true
            },
            include: [
                {
                    model: Machine_1.Machine,
                    as: "Machine",
                    required: true
                },
                {
                    model: Index_1.Codes,
                    as: "Codes",
                    required: true
                }
            ]
        });
        const dt = [];
        plantMachines.map(x => {
            const machines = x.Machine.map(y => y.machineCode);
            const prod = data.filter(x => machines.includes(x.line_c)).reduce((sum, x) => sum + x.PROD, 0);
            const def = data.filter(x => machines.includes(x.line_c)).reduce((sum, x) => sum + x.Def, 0);
            dt.push({
                name: x.name,
                Prod: prod,
                Def: def,
                IPD: (def / (prod + def)) * 100
            });
        });
        return res.json(dt);
    };
    static IPDByPlant = async (req, res) => {
        const { Plantid } = req.params;
        const tenantsGacs = [];
        const tenantsIGHS = [];
        let data = [];
        const servers = await Index_1.Codes.findAll({
            attributes: ["key", "type", 'cryServer'],
            include: [{
                    model: Machine_1.Machine,
                    required: true,
                    as: "Machine",
                    attributes: [],
                    where: [{
                            PlantId: Plantid
                        }]
                } /*,
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
                        const host = this.normalizes(cryighs.split('|')[0]);
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
            return this.withTimeout(this.getReportAllByYearACS(conn), 10000);
        });
        const promisesIGHS = tenantsIGHS.map(async (t) => {
            const conn = await (0, TenantConnection_1.TenantConnection)(t);
            return this.withTimeout(this.getReportAllByYearIGHS(conn), 10000);
        });
        const results = await Promise.allSettled(promises);
        for (let index = 0; index < results.length; index++) {
            if (index == 0) {
                data = results[index]["value"];
            }
            else {
                const machine = results[index]["value"];
                machine.forEach(element => {
                    if (data.filter(x => x.line_c == element.line_c && x.MONTH == element.MONTH && x.DAY == element.DAY && x.SHIFT == element.SHIFT).length != 0) {
                        data.map(x => {
                            if (x.line_c == element.line_c && x.MONTH == element.MONTH && x.DAY == element.DAY && x.SHIFT == element.SHIFT) {
                                x.PROD = x.PROD + element.PROD;
                                x.Def = x.Def + element.Def;
                            }
                            return x;
                        });
                    }
                    else {
                        data.push(element);
                    }
                });
            }
        }
        const resultsighs = await Promise.allSettled(promisesIGHS);
        for (let index = 0; index < resultsighs.length; index++) {
            const machine = resultsighs[index]["value"];
            machine.forEach(element => {
                if (data.filter(x => x.line_c == element.line_c && x.MONTH == element.MONTH && x.DAY == element.DAY && x.SHIFT == element.SHIFT).length != 0) {
                    data.map(x => {
                        if (x.line_c == element.line_c && x.MONTH == element.MONTH && x.DAY == element.DAY && x.SHIFT == element.SHIFT) {
                            x.PROD = x.PROD + element.PROD;
                            x.Def = x.Def + element.Def;
                        }
                        return x;
                    });
                }
                else {
                    data.push(element);
                }
            });
        }
        const plantMachines = await Plants_1.Plants.findAll({
            where: {
                status: true,
                id: Plantid
            },
            include: [
                {
                    model: Machine_1.Machine,
                    as: "Machine",
                    required: true
                },
                {
                    model: Index_1.Codes,
                    as: "Codes",
                    required: true
                }
            ]
        });
        const dt = [];
        plantMachines.map(x => {
            const machines = x.Machine.map(y => y.machineCode);
            for (let index = 0; index <= new Date().getMonth(); index++) {
                const prod = data.filter(x => x.MONTH == (index + 1)).reduce((sum, x) => sum + x.PROD, 0);
                const def = data.filter(x => x.MONTH == (index + 1)).reduce((sum, x) => sum + x.Def, 0);
                dt.push({
                    name: x.name,
                    Prod: prod + def,
                    MONTH: index + 1,
                    Def: def,
                    IPD: (def / (prod + def)) * 100
                });
            }
        });
        return res.json(dt);
    };
    static normalizes = (text) => {
        return text.replace(/\\+/g, "\\");
    };
    static getReportACS = async (sequelize) => {
        const query = `
             SELECT line_c,DAY,SHIFT,COUNT(SHIFT) AS PROD  FROM(
                select line_c,
                    CASE WHEN DATEPART(HH,insp_dt)<7 THEN DATEPART(DAY,DATEADD(DAY,-1,insp_dt)) else DATEPART(DAY,insp_dt) end AS DAY,
                    CASE WHEN DATEPART(HH,insp_dt)<2 OR DATEPART(HH,insp_dt)>=17 THEN 2 WHEN DATEPART(HH,insp_dt)>=7 THEN 1 ELSE 3 END AS SHIFT
                from insp_res
                where insp_dt>='2026-05-01 7:00:00' and wrkproc_c='p2'
            ) TEMP1
            WHERE DAY>0
            GROUP BY line_c,DAY,SHIFT
            ORDER BY line_c,DAY,SHIFT
        `;
        const result = await sequelize.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        //console.log(result)
        return result;
    };
    static getReportAllACS = async (sequelize) => {
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
        const result = await sequelize.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        //console.log(result)
        return result;
    };
    static getReportAllByYearACS = async (sequelize) => {
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
        const result = await sequelize.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        //console.log(result)
        return result;
    };
    static getReportIGHS = async (sequelize) => {
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
        const result = await sequelize.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        //console.log(result)
        return result;
    };
    static getReportAllIGHS = async (sequelize) => {
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
        const result = await sequelize.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        //console.log(result)
        return result;
    };
    static getReportAllByYearIGHS = async (sequelize) => {
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
        const result = await sequelize.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        //console.log(result)
        return result;
    };
    static withTimeout = (promise, ms) => {
        return Promise.race([
            promise,
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms)),
        ]);
    };
}
exports.ReportController = ReportController;
//# sourceMappingURL=ReportController.js.map