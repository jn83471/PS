"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FgssGenericController = void 0;
const crypto_1 = require("../../../Utils/crypto");
const TenantConnection_1 = require("../../../config/TenantConnection");
const Gnr_1 = require("../../../Utils/Gnr");
const sequelize_1 = require("sequelize");
class FgssGenericController {
    static Index = async (req, res) => {
        return res.send("fgss");
    };
    static ParNumberList = async (req, res) => {
        const cry = (0, crypto_1.decrypt)(req.codes.fgsServer);
        const tenantsFGSS = {
            name: "NoPart" + req.codes.key,
            host: cry.split('|')[0],
            database: cry.split('|')[1],
            username: "fgssaccess",
            password: "fgsssql"
        };
        //return res.json(cry)
        const conn = await (0, TenantConnection_1.TenantConnection)(tenantsFGSS);
        const promises = (0, Gnr_1.withTimeout)(this.getReportNuParts(conn, req.codes.key), 10000 // 3 segundos max
        );
        const results = await promises;
        return res.json(results);
    };
    static ParNumberListCustomers = async (req, res) => {
        const cry = (0, crypto_1.decrypt)(req.codes.fgsServer);
        const { PartNo } = req.params;
        const tenantsFGSS = {
            name: "NoPart" + req.codes.key,
            host: cry.split('|')[0],
            database: cry.split('|')[1],
            username: "fgssaccess",
            password: "fgsssql"
        };
        //return res.json(cry)
        const conn = await (0, TenantConnection_1.TenantConnection)(tenantsFGSS);
        const promises = (0, Gnr_1.withTimeout)(this.getReportNuPartsCustomers(conn, req.codes.key, PartNo.toString()), 10000 // 3 segundos max
        );
        const results = await promises;
        return res.json(results);
    };
    //32610-T5A-00
    static getReportNuParts = async (sequelize, code) => {
        const query = `
             select distinct sews_part_no
  FROM VW_XREF
  WHERE mfg_plant=:CODE
  ORDER BY sews_part_no ASC
        `;
        const result = await sequelize.query(query, {
            replacements: {
                CODE: code
            },
            type: sequelize_1.QueryTypes.SELECT,
        });
        return result;
    };
    static getReportNuPartsCustomers = async (sequelize, code, nuPart) => {
        const query = `
             select distinct cust_part_no
  FROM VW_XREF
  WHERE mfg_plant=:CODE AND sews_part_no=:NUPART
  ORDER BY cust_part_no ASC
        `;
        const result = await sequelize.query(query, {
            replacements: {
                CODE: code,
                NUPART: nuPart
            },
            type: sequelize_1.QueryTypes.SELECT,
        });
        return result;
    };
}
exports.FgssGenericController = FgssGenericController;
//# sourceMappingURL=FgssGenericController.js.map