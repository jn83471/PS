import { request, type Request, type Response } from "express";
import { UrsRequests } from "../../../Models/URS/UrsRequests";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { Codes } from "../../../Models/Codes";
import { DBConfig, TenantConnection } from "../../../config/TenantConnection";
import { decrypt } from "../../../Utils/crypto";
import { withTimeout } from "../../../Utils/Gnr";
import { FgssDetails } from "../../../types/FgssDetails";
import { UrsPriority } from "../../../Models/URS/UrsPriority";
import { UrsRequestScannHistory } from "../../../Models/URS/UrsRequestScannHistory";
import { io } from "../../../server";
import { UrsRequestsFolio } from "../../../Models/URS/UrsRequestsFolio";
import { UrsSendNewRequestVerification32, UrsSendNewRequestVerification4 } from "../../../Messages/Urs/UrsNewRequest";
import { EmailsToSend } from "../../../Models/EmailsToSend";

export class UrsScannController {
    static ScannHistory: any = async (req: Request, res: Response) => {
        try {
            const { ursFolioId } = req.params
            if (req.UrsRequestsFolio.Process == 99) {
                const error = new Error('El folio ya ha sido cancelado.')
                return res.status(401).json({ error: error.message })
            }
            const UrsRequestData = await UrsRequests.findAll({
                where: {
                    UrsRequestsFolioId: ursFolioId,
                    Process: {
                        [Op.not]: 99
                    },
                },
                include: [
                    {
                        model: Codes,
                        as: "Codes"
                    },
                    {
                        model: UrsPriority,
                        as: "UrsPriority"
                    },
                    {
                        model: UrsRequestScannHistory,
                        as: "UrsRequestScannHistory"
                    }
                ]
            })
            return res.send(UrsRequestData)
        } catch (error) {
            const errors = new Error('Hubo algun problema en la solicitud.')
            return res.status(401).json({ error: errors.message })
        }
    }

    static quitarSInicio(texto) {
        if (/^s/i.test(texto)) {
            return texto.substring(1);
        }
        return texto;
    }
    static Scann: any = async (req: Request, res: Response) => {
        try {

            let { Process, Box } = req.body
            const priorities = req.UrsRequestsFolio.UrsPriority.PriorityHasProcess
            const tenantsFgss: DBConfig[] = [
            ];
            Box = this.quitarSInicio(Box)

            const actualPriority = priorities.find(x => x.UrsProcessId == Process)
            if (!actualPriority) {
                return res.status(500).json({ error: "Proceso no encontrado" })
            }
            if (req.UrsRequestsFolio.Process == 99) {
                return res.status(500).json({ error: "La solicitud ha sido cancelada" })
            }
            if (req.UrsRequestsFolio.Process != 1) {
                const StartScann = await UrsRequestsFolio.update({
                    Process: 1
                }, {
                    where: {
                        id: req.UrsRequestsFolio.id
                    }
                })
            }




            const UrsRequest = await UrsRequests.findAll({
                where: [{
                    Process: {
                        [Op.not]: 99
                    },
                    UrsRequestsFolioId: req.UrsRequestsFolio.id
                },
                ],
                include: [
                    {
                        model: Codes,
                        as: "Codes"
                    },
                    {
                        model: UrsRequestScannHistory,
                        as: "UrsRequestScannHistory",
                        required: false,
                        where: [
                            {
                                UrsProcessId: Process
                            }
                        ]
                    }
                ]
            })


            const verifications = await UrsRequestScannHistory.findAll({
                where: [
                    {
                        Box: Box
                    }
                ]
            })

            if (actualPriority.Level > 0) {
                const beforeLevel = actualPriority.Level - 1
                const beforeProcess = priorities.find(x => x.Level == beforeLevel)
                //return res.json(beforeProcess)
                if (!verifications.find(x => x.UrsProcessId == beforeProcess.UrsProcessId)) {
                    return res.status(500).json({ error: "No se ha escaneado en proceso anterior" })
                }
            }

            if (!verifications && actualPriority.Level > 0) {
                return res.status(500).json({ error: "Necesita verificar proceso anterior" })
            }
            if (verifications.find(x => !UrsRequest.map(y => y.id).includes(x.UrsRequestsId))) {
                return res.status(500).json({ error: "Ya se encuentra en escaneado en otra caja" })
            }
            if (verifications.find(x => x.UrsProcessId == Process)) {
                return res.status(500).json({ error: "Ya se ha escaneado esta caja" })
            }


            const servers = [
                ...new Set(
                    UrsRequest.map(item => item.Codes?.fgsServer)
                )
            ].filter(Boolean);


            for (let index = 0; index < servers.length; index++) {
                try {
                    const cry = decrypt(servers[index].toLocaleString())
                    if (tenantsFgss?.filter(x => x.name == cry.split('|')[0]).length == 0) {

                        tenantsFgss.push({
                            name: cry.split('|')[0],
                            host: cry.split('|')[0],
                            database: cry.split('|')[1],
                            username: "fgssaccess",
                            password: "fgsssql"
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            const promises = tenantsFgss.map(async (t) => {
                const conn = await TenantConnection(t);

                return withTimeout(
                    this.getInfoFgss(conn, Box),
                    10000 // 3 segundos max
                );
            });

            // return res.json(tenantsIGHS)


            const results = await Promise.allSettled(promises);
            const dt: FgssDetails[] = []
            for (let index = 0; index < results.length; index++) {
                dt.push(...results[index]["value"]);
            }
            for (let index = 0; index < UrsRequest.length; index++) {
                const urs = dt.find(x => x.mfg_plant == UrsRequest[index].Codes.key &&
                    x.sews_part_no == UrsRequest[index].PartNumber &&
                    x.cust_part_no == UrsRequest[index].CustomerPartNumber &&
                    x.customer_id == UrsRequest[index].Customer &&
                    UrsRequest[index].Qty > UrsRequest[index].Scann &&
                    UrsRequest[index].Qty > UrsRequest[index].UrsRequestScannHistory.reduce((acc, x) => acc + x.Qty, 0)
                )
                console.log("index=" + index.toString())
                //console.log(UrsRequest[index])

                if (urs) {
                    const data = await UrsRequestScannHistory.create({
                        UrsRequestsId: UrsRequest[index].id,
                        UrsProcessId: Process,
                        Box: Box,
                        Qty: urs.box_qty
                    })
                    if (actualPriority.Level == Math.max(...priorities.map(item => item.Level))) {
                        const upd = await UrsRequests.update({
                            Scann: (UrsRequest[index].Scann + urs.box_qty)
                        }, {
                            where: [{
                                id: UrsRequest[index].id
                            }]
                        })

                    }

                    const UrsRequestData = await UrsRequests.findOne({
                        where: {
                            UrsRequestsFolioId: req.UrsRequestsFolio.id,
                            id: UrsRequest[index].id
                        },
                        include: [
                            {
                                model: Codes,
                                as: "Codes"
                            },
                            {
                                model: UrsPriority,
                                as: "UrsPriority"
                            },
                            {
                                model: UrsRequestScannHistory,
                                as: "UrsRequestScannHistory"
                            }
                        ]
                    })

                    const rqv = await UrsRequests.findAll({
                        where: {
                            Scann: {
                                [Op.lt]: Sequelize.col('Qty')
                            },
                            UrsRequestsFolioId: req.UrsRequestsFolio.id
                        }
                    });
                    console.log("pasa o no pasa")
                    console.log(rqv)
                    if (rqv.length == 0) {
                        const upd = await UrsRequestsFolio.update({
                            RecibedUserBy: req.User.id,
                            LastProcessDay: new Date()
                        },
                            {
                                where: [
                                    {
                                        id: req.UrsRequestsFolio.id
                                    }
                                ]
                            }
                        )

                        const Emails = await EmailsToSend.findOne({
                            where: [
                                {
                                    Key: "UrsProd"
                                }
                            ]
                        })

                        const UrsRequestData = await UrsRequests.findAll({
                            where: {
                                UrsRequestsFolioId: req.UrsRequestsFolio.id,
                                Process: {
                                    [Op.not]: 99
                                }
                            },
                            include: [
                                {
                                    model: Codes,
                                    as: "Codes"
                                },
                                {
                                    model: UrsPriority,
                                    as: "UrsPriority"
                                }
                            ]
                        })

                        const dt = {
                            data: UrsRequestData,
                            folio: req.UrsRequestsFolio,
                            title: "Solicitud de verificación",
                            to: Emails.Emails
                        }
                        await UrsSendNewRequestVerification32(dt)

                    }


                    io.to("Urs").emit("newScann", UrsRequestData)
                    return res.json("Escaneo realizado")
                }
                else {
                    //console.log(error.message)
                    //return res.status(500).json({ error: `Esta caja no coincide con ningun material solicitado ${UrsRequest[index].Qty} ${UrsRequest[index].UrsRequestScannHistory.length}` })
                }

            }
            return res.status(500).json({ error: "La caja no coincide con ninguna requisicion seleccionada" })
            return res.status(500).json({ servers, UrsRequest, dt })
        }
        catch (error) {
            console.log(error.message)
            return res.status(500).send("no se ha podido generar el cliente debido a algun problema")
        }
    }

    static getInfoFgss = async (sequelize: Sequelize, box: string) => {
        const query = `
             SELECT mfg_plant,sews_part_no,cust_part_no,customer_id,box_qty
  FROM VW_Box_lbl_info_picture
  where box_sno like :BOX

  /*FROM VW_XREF
  WHERE mfg_plant=:CODE AND sews_part_no=:NUPART
  ORDER BY cust_part_no ASC*/
        `;

        const result = await sequelize.query<{ cust_part_no: string }>(query, {
            replacements: {
                BOX: box
            },
            type: QueryTypes.SELECT,
        });
        return result
    }
}