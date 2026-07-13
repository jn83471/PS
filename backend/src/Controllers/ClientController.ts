import type { Request, Response } from "express";
import { Plants } from "../Models/Plants";
import { io } from "../server";
import { Json } from "sequelize/lib/utils";
import { Clients } from "../Models/Client";
import { Codes } from "../Models/Codes";

export class ClientController {
    static Index: any = async (req: Request, res: Response) => {
        const plants = await Clients.findAll({
            where: {
                status: true
            },
            include: [
                {
                    model: Codes,
                    as: "Codes"
                }
            ]
        })
        return res.json(plants)
    }
    /*if (!(req.User.Rols.CreatePlants)) {
            const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
            return res.status(401).json({ error: error.message })
        }*/
    static Show: any = async (req: Request, res: Response) => {
        if (!req.Client.status) {
            return res.status(404).send('Ya no se encuentra este cliente')
        }
        return res.json(req.Client)
    }
    static Create: any = async (req: Request, res: Response) => {
        try {
            if (!(req.User.Rols.CreateClients)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }
            const { defaultCode, name } = req.body
            const client = await Clients.create({
                name: name,
                defaultCode: defaultCode,
                status: true
            })

            const clients = await Clients.findOne({
                where: {
                    id: client.id
                }
                ,
                include: [
                    {
                        model: Codes,
                        as: "Codes"
                    }
                ]
            })
            io.to("Client").emit("newClient", clients)
            return res.send("Se ha generado el cliente")
        } catch (error) {
            return res.status(500).send("no se ha podido generar el cliente debido a algun problema")
        }

    }
    static Update: any = async (req: Request, res: Response) => {
        try {
            if (!(req.User.Rols.CreateClients)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }
            const { ClientId } = req.params
            const { CodesId, name,defaultCode } = req.body

            if (!(req.User.Rols.CreatePlants)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }

            const client = await Clients.update({
                CodesId, name,defaultCode
            }, {
                where: [
                    {
                        id: ClientId
                    }
                ]
            })
            const clients = await Clients.findOne({
                where: {
                    id:ClientId,
                }
                ,
                include: [
                    {
                        model: Codes,
                        as: "Codes"
                    }
                ]
            })
            io.to("Client").emit("editClient", clients)
            return res.send("Se ha modificado el cliente")
        } catch (error) {
            return res.status(500).send("no se ha podido modificar el cliente debido a algun problema")
        }
    }
    static Delete: any = async (req: Request, res: Response) => {
        try {
            if (!(req.User.Rols.CreateClients)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }
            const { ClientId } = req.params

            const plant = await Clients.update({
                status: false
            }, {
                where: [
                    {
                        id: ClientId
                    }
                ]
            })
            io.to("Client").emit("deleteClient", { id: ClientId })
            return res.send("Se ha eliminado el cliente")
        } catch (error) {
            console.log(error.message)
            return res.status(500).send("no se ha podido eliminar el cliente debido a algun problema")
        }
    }
}