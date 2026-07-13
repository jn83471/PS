import type { Request, Response, NextFunction } from 'express'
import { Plants } from '../../Models/Plants'
import { Machine } from '../../Models/Machine'

declare global{
    namespace Express{
        interface Request{
            machines:Machine
        }
    }
}

export const validateMachineExcist:any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { MachineId } = req.params
        const machine = await Machine.findOne({
            where:[
                {
                    id:MachineId
                }
            ]
        })
        if (!machine) {
            return res.status(404).json("Maquina no encontrada")
        }
        req.machines=machine
        return next()
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error en la busqueda' })
    }
    
}