import type { Request, Response, NextFunction } from 'express'
import { Plants } from '../../Models/Plants'
import { Machine } from '../../Models/Machine'
import { Clients } from '../../Models/Client'

declare global{
    namespace Express{
        interface Request{
            Client:Clients
        }
    }
}

export const validateClientExcist:any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ClientId } = req.params
        const client = await Clients.findOne({
            where:[
                {
                    id:ClientId
                }
            ]
        })
        if (!client) {
            return res.status(404).json("Cliente no encontrado")
        }
        req.Client=client
        return next()
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error en la busqueda' })
    }
    
}