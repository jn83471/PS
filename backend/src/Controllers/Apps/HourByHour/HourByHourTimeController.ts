/*Private tiempo As Integer =  'turno A
Private tiempoB As Integer = 26700*/
import type { Request, Response } from "express";
import { formatDateNow, withTimeout } from "../../../Utils/Gnr";
import { QueryTypes, Sequelize } from "sequelize";
import { Machine } from "../../../Models/Machine";
import { DBConfig, TenantConnection } from "../../../config/TenantConnection";
import { decrypt } from "../../../Utils/crypto";
import { Codes } from "../../../Models/Codes";
import { MachineEvents, MachineTime } from "../../../Models/HourByHour/HourByHourIndex";


export class HourByHourTimeController {
    static Index: any = async (req: Request, res: Response) => {
        const Events = await MachineEvents.findAll({
            include: [
                {
                    model: Machine,
                    as: "Machine"
                }
            ]
        })
        const Times = await MachineTime.findAll({
            include: [
                {
                    model: Machine,
                    as: "Machine"
                }
            ]
        })
        return res.json({ Events, Times })
    }
    static Show: any = async (req: Request, res: Response) => {
        const {MachineId}=req.params
        const Events = await MachineEvents.findAll({
            where:[{
                MachinesId:MachineId
            }],
            include: [
                {
                    model: Machine,
                    as: "Machine"
                }
            ]
        })
        return res.json(Events)
    }
    static Create: any = async (req: Request, res: Response) => {
        const {MachineId}=req.params
        const {Description,End,Start,Type}=req.body

        const insertedEvent=await MachineEvents.create(
            {
                MachinesId:MachineId,
                Description,End,Start,Type

            }
        )
        return res.json(insertedEvent)
    }
}