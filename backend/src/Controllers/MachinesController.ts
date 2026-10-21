import type { Request, Response } from "express";
import { Plants } from "../Models/Plants";
import { io } from "../server";
import { Json } from "sequelize/lib/utils";
import { Machine, Codes } from "../Models/Index";
import { Clients } from "../Models/Client";
import { Op } from "sequelize";


export class MachinesController {
    static Index: any = async (req: Request, res: Response) => {
        if (req.User.PlantId != null) {
            const machine = await Machine.findAll({
                where: {
                    status: true,
                    PlantId: req.User?.PlantId
                },
                include: [
                    { model: Codes, as: "Codes" },
                    { model: Plants, as: "plant" },
                    { model: Clients, as: "Clients" }
                ]
            });
            return res.json(machine)
        }


        const machine = await Machine.findAll({
            where: {
                status: true,
            },
            include: [
                { model: Codes, as: "Codes" },
                { model: Plants, as: "plant" },
                { model: Clients, as: "Clients" }]
        });

        return res.json(machine)
    }
    static Show: any = async (req: Request, res: Response) => {
        if (!req.machines.status) {
            return res.status(404).send('Ya no se encuentra esta mauina')
        }
        return res.json(req.machines)
    }
    static Create: any = async (req: Request, res: Response) => {
        try {
            if (!(req.User.Rols.changeLayoutMachines)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }
            const { CodesId, machineCode, ClientsId } = req.body
            let PlantId;
            if (req.User.PlantId != null) {
                PlantId = req.User.PlantId
            } else {
                PlantId = req.body.PlantId
            }
            const ValidateName=await Machine.findOne({
                where:[
                    {
                        machineCode:machineCode.toUpperCase(),
                        status:true
                    }
                ]
            })
            if(ValidateName){
                const error = new Error('El codigo de planta ya se encuentra en uso')
                return res.status(401).json({ error: error.message })
            }
            const plant = await Machine.create({
                PlantId,
                CodesId,
                machineCode:machineCode.toUpperCase(),
                ClientsId,
                status: true
            })
            const newmachine = await Machine.findOne({
                where: {
                    id: plant.id
                },
                include: [
                    { model: Codes, as: "Codes" },
                    { model: Plants, as: "plant" },
                    { model: Clients, as: "Clients" }
                ]
            });
            io.to("Machine").emit("newMachine", newmachine)
            return res.send("Se ha generado la maquina")
        } catch (error) {
            console.log(error.message)
            return res.status(500).send("no se ha podido generar la maquina debido a algun problema")
        }

    }
    static Update: any = async (req: Request, res: Response) => {
        try {
            const { MachineId } = req.params
            const { CodesId, machineCode, ClientsId } = req.body
            let PlantId;
            if (req.User.PlantId != null) {
                PlantId = req.User.PlantId
            } else {
                PlantId = req.body.PlantId
            }

            if (!(req.User.Rols.changeLayoutMachines)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }

            const ValidateName=await Machine.findOne({
                where:[
                    {
                        machineCode:machineCode.toUpperCase(),
                        status:true,
                        id:{
                            [Op.ne]:MachineId
                        }
                    }
                ]
            })
            if(ValidateName){
                const error = new Error('El codigo de planta ya se encuentra en uso')
                return res.status(401).json({ error: error.message })
            }
            const plant = await Machine.update({
                PlantId,
                CodesId,
                ClientsId,
                machineCode,
            }, {
                where: [
                    {
                        id: MachineId
                    }
                ]
            })
            const newmachine = await Machine.findOne({
                where: {
                    id: MachineId
                },
                include: [
                    { model: Codes, as: "Codes" },
                    { model: Plants, as: "plant" },
                    { model: Clients, as: "Clients" }
                ]
            });
            io.to("Machine").emit("editMachine", newmachine)
            return res.send("Se ha modificado la maquina")
        } catch (error) {
            console.log(error.message)
            return res.status(500).send("no se ha podido modificar la maquina debido a algun problema")
        }
    }
    static Delete: any = async (req: Request, res: Response) => {
        try {
            if (!(req.User.Rols.changeLayoutMachines)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }
            const { MachineId } = req.params

            if (req.User.PlantId != null) {
                const validatePlant = await Machine.findOne({
                    where: [
                        {
                            id: MachineId
                        }
                    ]
                })
                if (!validatePlant) {
                    const error = new Error('No cuenta con los permisos para realizar esta operación')
                    return res.status(401).json({ error: error.message })
                }
                if (validatePlant.PlantId != req.User.PlantId) {
                    const error = new Error('No cuenta con los permisos para realizar esta operación')
                    return res.status(401).json({ error: error.message })
                }
            }

            const plant = await Machine.update({
                status: false
            }, {
                where: [
                    {
                        id: MachineId
                    }
                ]
            })
            io.to("Machine").emit("deleteMachine", { id: MachineId })
            return res.send("Se ha eliminado la maquina")
        } catch (error) {
            console.log(error.message)
            return res.status(500).send("no se ha podido modificar la maquina debido a algun problema")
        }
    }
}