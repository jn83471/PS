import type { Request, Response } from "express";
import { Machine } from "../../../Models/Machine";
import { DBConfig, TenantConnection } from "../../../config/TenantConnection";
import { Codes } from "../../../Models/Codes";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { decrypt } from "../../../Utils/crypto";
import { formatDate, formatDateNow, normalizes, withTimeout } from "../../../Utils/Gnr";
import { PlanController } from "../../PlanController";
import { Plants, Users } from "../../../Models/Index";
import { Smhcas } from "../../../Models/SMHCAS";
import { PriorityHasProcess, UrsPriority, UrsProcess, UrsRequests, UrsRequestsFolio } from "../../../Models/URS/UrsIndex";
import { io, uploadDir } from "../../../server";
import { sendEmail } from "../../../Utils/Emails";
import { UrsSendNewRequest, UrsSendNewRequestVerification2, UrsSendNewRequestVerification3, UrsSendNewRequestVerification32, UrsSendNewRequestVerification4, UrsSendNewRequestVerification5, UrsSendNewRequestVerification6, UrsSendNewRequestVerificationCancel } from "../../../Messages/Urs/UrsNewRequest";
import { EmailsToSend } from "../../../Models/EmailsToSend";
import { ConvertToUTC, GetTimeZone } from "../../../Utils/GetTimeZone";
import PDFDocument from "pdfkit";
import bwipjs from 'bwip-js';
import { UrsRequestScannHistory } from "../../../Models/URS/UrsRequestScannHistory";
import { FgssDetails } from "../../../types/FgssDetails";
import { FggsAsnDetails } from "../../../types/FggsAsnDetails";
import path from "path";
import fs from 'fs';
import sharp from 'sharp';
import { UrsFolioPictures } from "../../../Models/URS/UrsFolioPictures";

export class UrsRequestFolioController {
    static Index: any = async (req: Request, res: Response) => {
        const plants = await UrsRequestsFolio.findAll({
            include: [
                {
                    model: Users,
                    as: "RequestUser"
                },
                {
                    model: Users,
                    as: "AprovedUser"
                },
                {
                    model: Users,
                    as: "FinishUser"
                },
                {
                    model: Users,
                    as: "RecibedUser"
                },
                {
                    model: UrsPriority,
                    as: "UrsPriority"
                },
                {
                    model: UrsRequests,
                    as: "UrsRequests",
                    required: true,
                    include: [{
                        model: UrsPriority,
                        as: "UrsPriority"
                    }]
                },
                {
                    model: UrsFolioPictures,
                    as: "UrsFolioPictures"
                }
            ]
        })
        return res.json(plants)
    }

    static Show: any = async (req: Request, res: Response) => {
        if (!req.UrsRequestsFolio) {
            return res.status(404).send('Ya no se encuentra esta requisición')
        }
        return res.json(req.UrsRequestsFolio)
    }
    static Deteail: any = async (req: Request, res: Response) => {
        const { ursFolioDetailId } = req.params
        const machine = await UrsRequestsFolio.findOne({
            where: [
                {
                    id: ursFolioDetailId
                }
            ],
            include: [
                {
                    model: Users,
                    as: "RequestUser"
                },
                {
                    model: Users,
                    as: "AprovedUser"
                },
                {
                    model: Users,
                    as: "FinishUser"
                },
                {
                    model: Users,
                    as: "RecibedUser"
                },
                {
                    model: Users,
                    as: "FinishUserSMTS"
                },
                {
                    model: UrsRequests,
                    as: "UrsRequests",
                    required: true,
                    include: [{
                        model: UrsPriority,
                        as: "UrsPriority"
                    },
                    {
                        model: Codes,
                        as: "Codes"
                    }],

                },
                {
                    model: UrsPriority,
                    as: "UrsPriority",
                    include: [
                        {
                            model: PriorityHasProcess,
                            as: "PriorityHasProcess",
                            include: [
                                {
                                    model: UrsProcess,
                                    as: "UrsProcess"
                                }
                            ]
                        }
                    ]
                },
                {
                    model: UrsFolioPictures,
                    as: "UrsFolioPictures"
                }

            ]
        })
        if (!machine) {
            return res.status(404).json("Solicitud no encontrada")
        }
        return res.json(machine)
    }
    static Create: any = async (req: Request, res: Response) => {

        try {
            /*if (!(req.User.Rols.CreateClients)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }*/
            const { ProposedDate, UrsPriorityId, motive, Hrs } = req.body

            const Request = await UrsRequestsFolio.create({
                RequestUserId: req.User.id,
                Qty: 0,
                Verify: 0,
                Process: 0,
                ProposedDate,
                UrsPriorityId,
                motive,
                hrs: ConvertToUTC(Hrs, GetTimeZone(req.User.TimeZone))
            })


            io.to("Urs").emit("Request", Request)
            return res.json(Request)
        } catch (error) {
            console.log(error.message)
            return res.status(500).send("no se ha podido generar el cliente debido a algun problema")
        }

    }

    static ChangePickUp: any = async (req: Request, res: Response) => {

        try {
            /*if (!(req.User.Rols.CreateClients)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }*/
            const { Hrs } = req.body

            const Request = await UrsRequestsFolio.update({
                hrs: ConvertToUTC(Hrs, GetTimeZone(req.User.TimeZone))
            }, {
                where: [{
                    id: req.UrsRequestsFolio.id
                }]
            })


            io.to("Urs").emit("Request", Request)
            return res.send("Se ha editado el PickUp")
        } catch (error) {
            console.log(error.message)
            return res.status(500).send("no se ha podido generar el cliente debido a algun problema")
        }

    }

    static Verify: any = async (req: Request, res: Response) => {

        try {
            const { Verify, ProposedDate } = req.body
            if (Verify == 1) {
                const UrsRequestData = await UrsRequests.findAll({
                    where: {
                        UrsRequestsFolioId: req.UrsRequestsFolio.id
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
                const Emails = await EmailsToSend.findOne({
                    where: [
                        {
                            Key: "UrsProd"
                        }
                    ]
                })
                if (!Emails) {
                    const error = new Error('No tiene correos a llenar')
                    return res.status(401).json({ error: error.message })
                }
                if (UrsRequestData.length == 0) {
                    const error = new Error('Se necesita llenar de productos para poder verificar')
                    return res.status(401).json({ error: error.message })
                }

                const Request = await UrsRequestsFolio.update({
                    AprovedUserBy: req.User.id,
                    Verify,
                    AprovedUserDate: new Date()
                }, {
                    where: [{
                        id: req.UrsRequestsFolio.id
                    }]
                })
                const dt = {
                    data: UrsRequestData,
                    folio: req.UrsRequestsFolio,
                    title: "Solicitud de envio SMTS",
                    to: Emails.Emails
                }
                await UrsSendNewRequest(dt)
                io.to("Urs").emit("Request", Request)
                return res.json("Se ha modificado la solicitud")
            }
            else if (Verify == 2) {
                const Request = await UrsRequestsFolio.update({
                    FinishUserBy: req.User.id,
                    Verify,
                    DeliveryDay: new Date()
                }, {
                    where: [{
                        id: req.UrsRequestsFolio.id
                    }]
                })
                const Emails = await EmailsToSend.findOne({
                    where: [
                        {
                            Key: "UrsSMTS"
                        }
                    ]
                })

                const UrsRequestData = await UrsRequests.findAll({
                    where: {
                        UrsRequestsFolioId: req.UrsRequestsFolio.id
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
                    title: "Solicitud aceptada",
                    to: Emails.Emails
                }

                await UrsSendNewRequestVerification2(dt)

                io.to("Urs").emit("Request", Request)
                return res.json("Se ha modificado la verificacion cp")
            }
            else if (Verify == 3) {
                let EmailToSends = "UrsESC"
                const files = req.files as Express.Multer.File[];
                if (files != undefined) {
                    const files = req.files as Express.Multer.File[];;

                    const imgs: Array<{
                        Verify: number;
                        UrsRequestsFolioId: number;
                        Name: string;
                    }> = []
                    for (let index = 0; index < files.length; index++) {
                        const element = files[index];

                        const fileName = `${req.UrsRequestsFolio.id}-finish-${index + 1}.webp`;

                        const filePath = path.join(
                            uploadDir,
                            "URS/Folios",
                            fileName
                        );

                        await sharp(element.buffer)
                            .webp({
                                quality: 50 // 0-100
                            })
                            /*.resize({
                                width: 1920, // opcional
                                withoutEnlargement: true
                            })*/
                            .toFile(filePath);
                        imgs.push({
                            Verify: 4,
                            UrsRequestsFolioId: req.UrsRequestsFolio.id,
                            Name: "URS/Folios/" + fileName
                        })

                    }
                    const images = await UrsFolioPictures.bulkCreate(imgs)
                    EmailToSends = "UrsProd"
                }
                const Request = await UrsRequestsFolio.update({
                    Verify,
                    FinishUserSMTSBy: req.User.id,
                    FinishUserSMTSDate: new Date(),
                }, {
                    where: [{
                        id: req.UrsRequestsFolio.id
                    }]
                })

                const Emails = await EmailsToSend.findOne({
                    where: [
                        {
                            Key: EmailToSends
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
                    title: "Solicitud en escaneo",
                    to: Emails.Emails
                }
                if (files != undefined) {
                    await UrsSendNewRequestVerification4(dt)
                }
                else{
                    await UrsSendNewRequestVerification3(dt)
                }

                io.to("Urs").emit("Request", Request)
                return res.json("Se ha modificado la verificacion actual")
            }
            else if (Verify == 4) {
                /*const files = req.files as Express.Multer.File[];;

                const imgs: Array<{
                    Verify: number;
                    UrsRequestsFolioId: number;
                    Name: string;
                }> = []
                for (let index = 0; index < files.length; index++) {
                    const element = files[index];

                    const fileName = `${req.UrsRequestsFolio.id}-finish-${index + 1}.webp`;

                    const filePath = path.join(
                        uploadDir,
                        "URS/Folios",
                        fileName
                    );

                    await sharp(element.buffer)
                        .webp({
                            quality: 50 // 0-100
                        })

                        .toFile(filePath);
                    imgs.push({
                        Verify: 4,
                        UrsRequestsFolioId: req.UrsRequestsFolio.id,
                        Name: "URS/Folios/" + fileName
                    })

                }
                const images = await UrsFolioPictures.bulkCreate(imgs)*/
                const Request = await UrsRequestsFolio.update({
                    ClosedUserId: req.User.id,
                    Verify,
                    ClosedDay: new Date()
                }, {
                    where: [{
                        id: req.UrsRequestsFolio.id
                    }]
                })

                const Emails = await EmailsToSend.findOne({
                    where: [
                        {
                            Key: "UrsSMTS"
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
                await UrsSendNewRequestVerification5(dt)

                //io.to("Urs").emit("Request", Request)*/
                return res.json("Se ha realizado la verificacion de embarque")
            }
            else if (Verify == 5) {
                const files = req.files as Express.Multer.File[];;

                const imgs: Array<{
                    Verify: number;
                    UrsRequestsFolioId: number;
                    Name: string;
                }> = []
                for (let index = 0; index < files.length; index++) {
                    const element = files[index];

                    const fileName = `${req.UrsRequestsFolio.id}-send-${index + 1}.webp`;

                    const filePath = path.join(
                        uploadDir,
                        "URS/Folios",
                        fileName
                    );

                    await sharp(element.buffer)
                        .webp({
                            quality: 50 // 0-100
                        })

                        .toFile(filePath);
                    imgs.push({
                        Verify: 5,
                        UrsRequestsFolioId: req.UrsRequestsFolio.id,
                        Name: "URS/Folios/" + fileName
                    })

                }
                const images = await UrsFolioPictures.bulkCreate(imgs)
                const Request = await UrsRequestsFolio.update({
                    Verify,
                    SMTSLastVerificationUser: req.User.id,
                    SMTSLastVerification: new Date()
                }, {
                    where: [{
                        id: req.UrsRequestsFolio.id
                    }]
                })

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
                await UrsSendNewRequestVerification6(dt)

                io.to("Urs").emit("Request", Request)
                return res.json("Se ha realizado la verificacion de embarque")
            }
            else {
                return res.status(500).json({ error: "no se ha podido generar el cliente debido a algun problema" })
            }



        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ error: "no se ha podido generar el cliente debido a algun problema" })
        }

    }
    static Cancel: any = async (req: Request, res: Response) => {
        try {
            if (req.UrsRequestsFolio.Process == 99) {
                const error = new Error('Requisición ya cancelada')
                return res.status(401).json({ error: error.message })
            }
            if (req.UrsRequestsFolio.Process >= 3) {
                const error = new Error('Requisición ya en tránsito')
                return res.status(401).json({ error: error.message })
            }
            if (req.UrsRequestsFolio.Verify != 2 && req.UrsRequestsFolio.Verify != 0) {
                return res.status(500).json({ error: "Esta solicicitud no puede ser cancelada" })
            }
            const cancelar = await UrsRequestsFolio.update({
                CancelDay: new Date(),
                Process: 99
            }, {
                where: {
                    id: req.UrsRequestsFolio.id
                }
            })


            if (req.UrsRequestsFolio.Verify == 2) {

                const Emails = await EmailsToSend.findOne({
                    where: [
                        {
                            Key: "UrsProd"
                        }
                    ]
                })
                const title = "Se ha cancelado la solicitud por SMTS"


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
                    title,
                    to: Emails.Emails
                }

                await UrsSendNewRequestVerificationCancel(dt)
            }

            return res.json("Se ha cancelado la requisición")

        }
        catch (error) {
            console.log(error.message)
            return res.status(500).send("no se ha podido generar el cliente debido a algun problema")
        }
    }

    static DownloadAsn: any = async (req: Request, res: Response) => {
        try {

            //create document
            const doc = new PDFDocument({
                margin: 20,
                size: "LETTER"
            });

            res.setHeader(
                "Content-Type",
                "application/pdf"
            );

            res.setHeader(
                "Content-Disposition",
                "attachment; filename=ASN.pdf"
            );

            doc.pipe(res);

            doc
                .font("Courier-Bold")
                .fontSize(14)
                .text("PACKING LIST", {
                    align: 'center'
                })
                ;



            doc.moveDown();


            const tenantsFgss: DBConfig[] = [
            ];

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
                    }
                ]
            })
            const servers = [
                ...new Set(
                    UrsRequest.map(item => item.Codes?.fgsServer)
                )
            ].filter(Boolean);
            const boxes = [
                ...new Set(
                    UrsRequest.flatMap(item => item.UrsRequestScannHistory?.map(box => box.Box))
                )
            ].filter(Boolean);

            //console.log(boxes)


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
                    this.getInfoASN(conn, boxes),
                    10000 // 3 segundos max
                );
            });

            const results = await Promise.allSettled(promises);
            const dt: FggsAsnDetails[] = []
            for (let index = 0; index < results.length; index++) {
                dt.push(...results[index]["value"]);
            }

            const unique = [
                ...new Map(
                    dt.map(item => [
                        `${item.mfg_plant}|${item.asn_number}`,
                        `${item.mfg_plant}|${item.asn_number}`
                    ])
                ).values(),
            ];

            console.log(boxes)
            console.log(dt)
            console.log("unique")
            console.log(unique)

            for (let index = 0; index < unique.length; index++) {
                const asn = unique[index].split('|')
                const barcode = await bwipjs.toBuffer({
                    bcid: 'code128',
                    text: asn[1],
                    scale: 2,
                    height: 10,
                    includetext: true,
                    textxalign: 'center'
                });
                const data = dt.filter(x => x.mfg_plant == asn[0] && x.asn_number == asn[1])
                if (data.length == 0) {
                    continue
                }

                const rows = data.map(elm => {
                    return {
                        skid: elm.master_label_serial_number,
                        description: elm.Description,
                        partNumber: elm.cust_part_no,
                        design: elm.sews_design_level,
                        boxQty: elm.qty,
                        totalQty: elm.total,
                        weight: Math.round(elm.weight * 100) / 100
                    }
                })
                /*{
                    skid: "5UMC7KO24",
                    description:
                        "JUMPER DOOR TRIM REAR\nLEFT 64624P FRT DR\nTRIM LEFT",
                    partNumber: "Y1555419",
                    design: "Q20002",
                    boxQty: 1,
                    totalQty: 825,
                    weight: 841.50
                },
                {
                    skid: "5UMC7KO26",
                    description:
                        "DOOR TRIM JUMPER REAR\nLEFT 64624P",
                    partNumber: "Y0238966",
                    design: "Q50202",
                    boxQty: 4,
                    totalQty: 300,
                    weight: 96.00
                }*/


                doc.font('Courier').fontSize(10);

                doc.text('From', 10, 65);
                doc.text(':', 115, 65);
                doc.text('SEWS/ATR Santiago, Nayarit', 130, 65);

                doc.image(barcode, 430, 45, {
                    width: 100
                });

                // TO
                doc.text('To', 10, 85);
                doc.text(':', 115, 85);
                doc.text('Materials Service Center', 130, 85);

                // ASN NO
                doc.text('ASN No.', 10, 105);
                doc.text(':', 115, 105);
                doc.text(asn[1], 130, 105);

                // ASN VERSION
                doc.text('ASNVersion', 250, 105);
                doc.text(':', 310, 105);
                doc.text(data[0].asn_version, 320, 105);

                // PO NUMBER
                doc.text('PO Number', 10, 125);
                doc.text(':', 115, 125);

                // TRUCK INFO
                doc.text('Truck Info', 250, 125);
                doc.text(':', 310, 125);
                doc.text(data[0].TruckInfo, 320, 125);

                // PAGE
                doc.text('Page', 440, 85);
                doc.text(':', 490, 85);
                doc.text('1/1', 500, 85);

                // DATE
                doc.text('Date', 440, 105);
                doc.text(':', 490, 105);
                doc.text(new Date(data[0].ACCT_DATE).toLocaleString().substring(0, 10), 500, 105);

                // ASN DATE
                doc.text('ASN Date', 440, 125);
                doc.text(':', 490, 125);
                doc.text(new Date(data[0].ACCT_DATE).toLocaleString().substring(0, 10), 500, 125);


                const startY = 160;

                doc.moveTo(10, startY)
                    .lineTo(600, startY)
                    .stroke();

                doc.font("Courier-Bold")
                    .fontSize(9);

                doc.text("SKID", 15, startY + 10);

                doc.text("Description", 70, startY + 10);

                doc.text("Product Number", 220, startY + 10);

                doc.text("DESIGN\nCHANGE", 320, startY + 5);

                doc.text("Box Qty", 400, startY + 10);

                doc.text("Total Qty", 460, startY + 10);

                doc.text("Weight\n(lbl.)", 540, startY + 5);

                doc.moveTo(10, startY + 45)
                    .lineTo(600, startY + 45)
                    .stroke();
                ``

                let currentY = startY + 55;

                doc.font("Courier")
                    .fontSize(8);

                for (const row of rows) {

                    const height =
                        doc.heightOfString(
                            row.description,
                            {
                                width: 150
                            }
                        );

                    doc.text(row.skid, 15, currentY);

                    doc.text(
                        row.description,
                        70,
                        currentY,
                        {
                            width: 150
                        }
                    );

                    doc.text(
                        row.partNumber,
                        220,
                        currentY
                    );

                    doc.text(
                        row.design,
                        320,
                        currentY
                    );

                    doc.text(
                        row.boxQty.toString(),
                        400,
                        currentY,
                        {
                            width: 40,
                            align: "center"
                        }
                    );

                    doc.text(
                        row.totalQty.toString(),
                        460,
                        currentY,
                        {
                            width: 50,
                            align: "center"
                        }
                    );

                    doc.text(
                        row.weight.toFixed(2),
                        540,
                        currentY,
                        {
                            width: 50,
                            align: "center"
                        }
                    );

                    currentY += height + 15;

                    // línea punteada
                    doc.dash(2, { space: 4 });

                    doc.moveTo(10, currentY)
                        .lineTo(600, currentY)
                        .stroke();

                    doc.undash();

                    currentY += 10;
                }

            }



            doc.end();
        }
        catch (error) {
            console.log(error.message)
            return res.status(500).send("no se ha podido generar el cliente debido a algun problema")
        }
    }
    static getInfoASN = async (sequelize: Sequelize
        , boxes: string[]
    ) => {
        const query = `



        SELECT
  m.mfg_plant,
asn_number,asn_version,carrier+' '+transport_information as TruckInfo,ACCT_DATE,
m.master_label_serial_number,m.cust_desc1+' '+b.cust_desc2+' '+b.cust_desc3 as Description,
m.cust_part_no,m.sews_design_level,COUNT(b.box_qty)/TEMP2.QTY as qty,sum(b.box_qty)/TEMP2.QTY as total,sum(b.box_qty/TEMP2.QTY*b.piece_weight)+ISNULL(ROUND((COUNT(b.box_qty)/TEMP2.QTY*max(b.box_weight)),2),0) as weight
  FROM [FGSSDB].[dbo].[VW_ASNREPL] m
  inner join VW_Box_lbl_info_picture b on b.pallet_sno=m.pallet_number
  INNER JOIN (
  SELECT t.master_label_serial_number, COUNT(t.master_label_serial_number) AS QTY
  FROM [FGSSDB].[dbo].[VW_ASNREPL] t
  where  box_serial_number in(:BOX) 
  group by
  t.master_label_serial_number
  ) TEMP2 ON TEMP2.master_label_serial_number=m.master_label_serial_number
  where box_serial_number in(:BOX) 
  
  group by m.mfg_plant,m.master_label_serial_number,m.cust_desc1,m.cust_part_no,m.sews_design_level,b.cust_desc2,b.cust_desc3,
  asn_number,asn_version,carrier,transport_information,ACCT_DATE,TEMP2.QTY


      /*SELECT
            m.mfg_plant,
            asn_number,asn_version,carrier+' '+transport_information as TruckInfo,ACCT_DATE,
            m.master_label_serial_number,m.cust_desc1+' '+b.cust_desc2+' '+b.cust_desc3 as Description,m.cust_part_no,m.sews_design_level,
            COUNT(b.box_qty) as qty,sum(b.box_qty) as total,sum(b.box_qty*b.piece_weight)+(COUNT(b.box_qty)*max(b.box_weight)) as weight
            FROM [FGSSDB].[dbo].[VW_ASNREPL] m
            inner join VW_Box_lbl_info_picture b on b.pallet_sno=m.pallet_number
            where box_serial_number IN(:BOX)
            group by m.mfg_plant,m.master_label_serial_number,m.cust_desc1,m.cust_part_no,m.sews_design_level,b.cust_desc2,b.cust_desc3,
            asn_number,asn_version,carrier,transport_information,ACCT_DATE*/
        `;

        const result = await sequelize.query<{
            mfg_plant: string
            asn_number: string,
            asn_version: number,
            TruckInfo: string,
            ACCT_DATE: string,
            master_label_serial_number: string,
            Description: string | null,
            cust_part_no: string,
            sews_design_level: string,
            qty: number,
            total: number,
            weight: number
        }>(query, {
            replacements: {
                BOX: boxes
            },
            type: QueryTypes.SELECT,
        });
        return result
    }
}