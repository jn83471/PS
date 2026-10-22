import type { Request, Response, NextFunction } from 'express'
import { Plans } from "../../Models/Plan"

declare global{
    namespace Express{
        interface Request{
            Plans:Plans
        }
    }
}

export const ValindatePlans:any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { planId } = req.params
        const plan = await Plans.findOne({
            where:[
                {
                    id:planId
                }
            ]
        })
        if (!plan) {
            return res.status(404).json("Maquina no encontrada")
        }
        req.Plans=plan
        return next()
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error en la busqueda' })
    }
    
}