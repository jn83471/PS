import type { Request, Response } from "express";
import { Plants } from "../Models/Plants";
import { io } from "../server";
import { Json } from "sequelize/lib/utils";
import { Codes } from "../Models/Codes";

export class PlantsController {
    static Index: any = async (req: Request, res: Response) => {
        if (req.User.PlantId != null) {
            const plants = await Plants.findAll({
                where: {
                    status: true,
                    id: req.User.PlantId
                },
                include: [
                    {
                        model: Codes,
                        as: "Code"
                    }
                ]
            })
            return res.json(plants)
        }
        const plants = await Plants.findAll({
            where: {
                status: true
            }
            ,
            include: [
                {
                    model: Codes,
                    as: "Code"
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
        if (!req.plants.status) {
            return res.status(404).send('Ya no se encuentra esta planta')
        }
        return res.json(req.plants)
    }
    static Create: any = async (req: Request, res: Response) => {
        try {
            if (!(req.User.Rols.CreatePlants)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }
            const { name, defaultCode, type } = req.body
            const plant = await Plants.create({
                name: name,
                defaultCode: defaultCode,
                type: type,
                APPKEY: '',
                status: true
            })
            const plants = await Plants.findOne({
                where: {
                    id:plant.id,
                    status: true
                }
                ,
                include: [
                    {
                        model: Codes,
                        as: "Code"
                    }
                ]
            })
            io.to("Plants").emit("newPlant", plants)
            return res.send("Se ha generado la planta")

        } catch (error) {
            return res.status(500).send("no se ha podido generar la planta debido a algun problema")
        }

    }
    static Update: any = async (req: Request, res: Response) => {
        try {
            if (!(req.User.Rols.CreatePlants)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }
            const { PlantId } = req.params
            const { name, defaultCode, type } = req.body

           /* if (!req.plants.status) {
                return res.status(404).send('Ya no se encuentra esta planta')
            }*/

            const plant = await Plants.update({
                name: name,
                defaultCode: defaultCode,
                type: type,
                status: true
            }, {
                where: [
                    {
                        id: PlantId
                    }
                ]
            })

            const plants = await Plants.findOne({
                where: {
                    id:PlantId,
                    status: true
                }
                ,
                include: [
                    {
                        model: Codes,
                        as: "Code"
                    }
                ]
            })
            io.to("Plants").emit("editPlant", plants)
            return res.send("Se ha modificado la planta")
        } catch (error) {
            console.log(error.message)
            return res.status(500).send("no se ha podido modificar la planta debido a algun problema")
        }
    }
    static Delete: any = async (req: Request, res: Response) => {
        try {
            if (!(req.User.Rols.CreatePlants)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }
            const { PlantId } = req.params
            const plant = await Plants.update({
                status: false
            }, {
                where: [
                    {
                        id: PlantId
                    }
                ]
            })
            io.to("Plants").emit("deletePlant", { id: PlantId })
            return res.send("Se ha eliminado la planta")
        } catch (error) {
            return res.status(500).send("no se ha podido modificar la planta debido a algun problema")
        }
    }
}