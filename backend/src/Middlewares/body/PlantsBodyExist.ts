import type { Request, Response, NextFunction } from 'express'
import { Plants } from '../../Models/Plants'
import { Machine } from '../../Models/Machine'

declare global{
    namespace Express{
        interface Request{
            plants:Plants
        }
    }
}

export const PlantsBodyExist:any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.User.PlantId!=null){
            return next()
        }
        const { PlantId } = req.body
        const plant = await Plants.findOne({
            where:[
                {
                    id:PlantId
                }
            ]
        })
        if (!plant) {
            return res.status(404).json("Planta no encontrada")
        }
        req.plants=plant
        return next()
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error en la busqueda' })
    }
    
}