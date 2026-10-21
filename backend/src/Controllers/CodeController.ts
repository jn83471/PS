import type { Request, Response } from "express";
import { Plants } from "../Models/Plants";
import { io } from "../server";
import { Json } from "sequelize/lib/utils";
import { Codes } from "../Models/Index";
import { encrypt } from "../Utils/crypto";

export class CodeController {
    static Index: any = async (req: Request, res: Response) => {

        const codes = await Codes.findAll({
            where: {
                status: true,
            }
        })
        return res.json(codes)
    }
    /*if (!(req.User.Rols.CreatePlants)) {
            const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
            return res.status(401).json({ error: error.message })
        }*/
    static Show: any = async (req: Request, res: Response) => {
        if (!req.plants.status) {
            return res.status(404).send('Ya no se encuentra esta planta')
        }
        return res.json(req.plants)
    }
    static Create: any = async (req: Request, res: Response) => {
        try {
            const { name, key, server, db,fgsServer,fgsdb } = req.body

            const cr = encrypt(`${server}|${db}`)
            const fgs = encrypt(`${fgsServer}|${fgsdb}`)
            const code = await Codes.create({ name, key, cryServer: cr,fgsServer:fgs })
            io.to("Codes").emit("newCode", code)
            return res.send("Se ha generado el codigó")
        } catch (error) {
            console.log(error)
            return res.status(500).send("no se ha podido generar la planta debido a algun problemas")
        }

    }
    static Update: any = async (req: Request, res: Response) => {
        try {
            const { PlantId } = req.params
            const { name, parkings, type } = req.body

            if (!req.plants.status) {
                return res.status(404).send('Ya no se encuentra esta planta')
            }

            const plant = await Plants.update({
                name: name,
                parkings: parkings,
                type: type,
                status: true
            }, {
                where: [
                    {
                        id: PlantId
                    }
                ]
            })
            io.to("Codes").emit("editCode", {
                id: PlantId,
                name: name,
                parkings: parkings,
                type: type,
            })
            return res.send("Se ha modificado la planta")
            return res.send("Se ha modificado la planta")
        } catch (error) {
            return res.status(500).send("no se ha podido modificar la planta debido a algun problema")
        }
    }
    static Delete: any = async (req: Request, res: Response) => {
        try {
            const { CodeId } = req.params

            const code = await Codes.update({
                status: false
            }, {
                where: [
                    {
                        id: CodeId
                    }
                ]
            })
            io.to("Codes").emit("deleteCode", { id: CodeId })
            return res.send("Se ha eliminado el codigo")
        } catch (error) {
            return res.status(500).send("no se ha podido modificar la planta debido a algun problema")
        }
    }
}