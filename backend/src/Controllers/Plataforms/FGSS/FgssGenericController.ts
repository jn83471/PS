import type { Request, Response } from "express";
import { Plants } from "../../../Models/Plants";
import { io } from "../../../server";
import { Json } from "sequelize/lib/utils";
import { Clients } from "../../../Models/Client";
import { Codes } from "../../../Models/Codes";
import { decrypt } from "../../../Utils/crypto";
import { DBConfig, TenantConnection } from "../../../config/TenantConnection";
import { withTimeout } from "../../../Utils/Gnr";
import { QueryTypes, Sequelize } from "sequelize";

export class FgssGenericController {
    static Index: any = async (req: Request, res: Response) => {
        return res.send("fgss")
    }
    static ParNumberList: any = async (req: Request, res: Response) => {

        const cry = decrypt(req.codes.fgsServer)

        const tenantsFGSS: DBConfig = {
            name: "NoPart" + req.codes.key,
            host: cry.split('|')[0],
            database: cry.split('|')[1],
            username: "fgssaccess",
            password: "fgsssql"
        }

        //return res.json(cry)
        const conn = await TenantConnection(tenantsFGSS);
        const promises = withTimeout(
            this.getReportNuParts(conn, req.codes.key),
            10000 // 3 segundos max
        );
        const results = await promises
        return res.json(results)
    }
    static ParNumberListCustomers: any = async (req: Request, res: Response) => {

        const cry = decrypt(req.codes.fgsServer)

        const {PartNo}=req.params

        const tenantsFGSS: DBConfig = {
            name: "NoPart" + req.codes.key,
            host: cry.split('|')[0],
            database: cry.split('|')[1],
            username: "fgssaccess",
            password: "fgsssql"
        }

        //return res.json(cry)
        const conn = await TenantConnection(tenantsFGSS);
        const promises = withTimeout(
            this.getReportNuPartsCustomers(conn, req.codes.key,PartNo.toString()),
            10000 // 3 segundos max
        );
        const results = await promises
        return res.json(results)
    }
    static ParNumberListCustomersCustom: any = async (req: Request, res: Response) => {

        const cry = decrypt(req.codes.fgsServer)

        const {PartNo,CustomerPartNumber}=req.params

        const tenantsFGSS: DBConfig = {
            name: "NoPart" + req.codes.key,
            host: cry.split('|')[0],
            database: cry.split('|')[1],
            username: "fgssaccess",
            password: "fgsssql"
        }

        //return res.json(cry)
        const conn = await TenantConnection(tenantsFGSS);
        const promises = withTimeout(
            this.getReportNuPartsCustomersCust(conn, req.codes.key,PartNo.toString(),CustomerPartNumber.toString()),
            10000 // 3 segundos max
        );
        const results = await promises
        return res.json(results)
    }

    //32610-T5A-00


    static getReportNuParts = async (sequelize: Sequelize, code: string) => {
        const query = `
             select distinct sews_part_no
             FROM VW_Box_lbl_info_picture
  WHERE mfg_plant=:CODE
  ORDER BY sews_part_no ASC

  /*FROM VW_XREF
  WHERE mfg_plant=:CODE
  ORDER BY sews_part_no ASC*/
        `;

        const result = await sequelize.query<{ sews_part_no: string }>(query, {
            replacements: {
                CODE: code
            },
            type: QueryTypes.SELECT,
        });
        return result
    }

    static getReportNuPartsCustomers = async (sequelize: Sequelize, code: string, nuPart: string) => {
        const query = `
             select distinct cust_part_no
             FROM VW_Box_lbl_info_picture
             WHERE mfg_plant=:CODE AND sews_part_no=:NUPART
            ORDER BY cust_part_no ASC

  /*FROM VW_XREF
  WHERE mfg_plant=:CODE AND sews_part_no=:NUPART
  ORDER BY cust_part_no ASC*/
        `;

        const result = await sequelize.query<{ cust_part_no: string }>(query, {
            replacements: {
                CODE: code,
                NUPART:nuPart
            },
            type: QueryTypes.SELECT,
        });
        return result
    }
    static getReportNuPartsCustomersCust = async (sequelize: Sequelize, code: string, nuPart: string,customerpart:string) => {
        const query = `
             select distinct customer_id
             FROM VW_Box_lbl_info_picture
             WHERE mfg_plant=:CODE AND sews_part_no=:NUPART AND cust_part_no=:CURSTOMERPART
  ORDER BY customer_id ASC
  /*FROM VW_XREF
  WHERE mfg_plant=:CODE AND sews_part_no=:NUPART AND cust_part_no=:CURSTOMERPART
  ORDER BY customer_id ASC*/
        `;

        const result = await sequelize.query<{ cust_part_no: string }>(query, {
            replacements: {
                CODE: code,
                NUPART:nuPart,
                CURSTOMERPART:customerpart
            },
            type: QueryTypes.SELECT,
        });
        return result
    }
}