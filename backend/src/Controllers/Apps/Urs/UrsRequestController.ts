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
import { UrsPriority, UrsRequests, UrsRequestsFolio } from "../../../Models/URS/UrsIndex";
import { io } from "../../../server";

export class UrsRequestController {
    static Index: any = async (req: Request, res: Response) => {
        try {
            const { ursFolioId } = req.params
            if (req.UrsRequestsFolio.Process == 99) {
                const error = new Error('El folio ya ha sido cancelado.')
                return res.status(401).json({ error: error.message })
            }
            const UrsRequestData = await UrsRequests.findAll({
                where: {
                    UrsRequestsFolioId: ursFolioId
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
            return res.send(UrsRequestData)
        } catch (error) {
            const errors = new Error('Hubo algun problema en la solicitud.')
            return res.status(401).json({ error: errors.message })
        }


    }
    static Create: any = async (req: Request, res: Response) => {
        try {
            const { ursFolioId } = req.params

            if (req.UrsRequestsFolio.Process == 99) {
                const error = new Error('El folio ya ha sido cancelado.')
                return res.status(401).json({ error: error.message })
            }
            const { CodesId, PartNumber, CustomerPartNumber, Customer, Qty, motive, UrsPriorityId } = req.body

            //const validateRequest=await UrsRequests.findOne

            const UrsRequestData = await UrsRequests.create({
                UrsRequestsFolioId: ursFolioId,
                CodeId: CodesId,
                PartNumber,
                CustomerPartNumber,
                Customer,
                Qty,
                Reason: motive,
                Process: 0,
                UrsPriorityId
            })

            req.UrsRequestsFolio.Qty += parseInt(Qty)
            await UrsRequestsFolio.update({
                Qty: req.UrsRequestsFolio.Qty
            }, {
                where: {
                    id: ursFolioId
                }
            })

            return res.send(ursFolioId)
        } catch (error) {
            const errors = new Error('Hubo algun problema en la solicitud.')
            return res.status(401).json({ error: errors.message })
        }

    }
    static Cancel: any = async (req: Request, res: Response) => {
        try {
            if (req.UrsRequestsFolio.Process == 99) {
                const error = new Error('El folio ya ha sido cancelado.')
                return res.status(401).json({ error: error.message })
            }
            else if (req.UrsRequestsFolio.id != req.UrsRequests.UrsRequestsFolioId) {
                const error = new Error('La requisición no coincide con el folio.')
                return res.status(401).json({ error: error.message })
            }
            else if (req.UrsRequests.Process == "99") {
                const error = new Error('La requisición ya ha sido cancelada.')
                return res.status(401).json({ error: error.message })
            }
            const validateRequest=await UrsRequests.findAll({
                where:{
                    UrsRequestsFolioId:req.UrsRequestsFolio.id,
                    Process:0
                }
            })
            if(validateRequest.length<=1){
                const error = new Error('No se puede cancelar todas ordenes')
                return res.status(401).json({ error: error.message })
            }
            const product = await UrsRequests.update({
                Process: 99
            }, {
                where: [{
                    id: req.UrsRequests.id
                }]
            })
            const folio = await UrsRequestsFolio.update({
                Qty: req.UrsRequestsFolio.Qty - req.UrsRequests.Qty
            },
                {
                    where: [{
                        id: req.UrsRequestsFolio.id
                    }]
                })
            return res.send("Se ha cancelado la requisición de material.")
        }
        catch (error) {
            const errors = new Error('Hubo algun problema en la solicitud.')
            return res.status(401).json({ error: errors.message })
        }
    }
    static ProposedDate: any = async (req: Request, res: Response) => {
        try {
            if (req.UrsRequestsFolio.Process == 99) {
                const error = new Error('El folio ya ha sido cancelado.')
                return res.status(401).json({ error: error.message })
            }
            else if (req.UrsRequestsFolio.id != req.UrsRequests.UrsRequestsFolioId) {
                const error = new Error('La requisición no coincide con el folio.')
                return res.status(401).json({ error: error.message })
            }
            else if (req.UrsRequests.Process == "99") {
                const error = new Error('La requisición ya ha sido cancelada.')
                return res.status(401).json({ error: error.message })
            }
            const {ProposedDate}=req.body
            const dt = await UrsRequests.update({
                ProposedDate: ProposedDate
            },
                {
                    where: [{
                        id: req.UrsRequests.id
                    }]
                })
            return res.send("Se ha modificado la fecha propuesta de producto.")
        }
        catch (error) {
            const errors = new Error('Hubo algun problema en la solicitud.')
            return res.status(401).json({ error: errors.message })
        }
    }
}

/*id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        CodeId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        PartNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CustomerPartNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Customer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        Reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Process: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:0
        },
        UrsPriorityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },*/