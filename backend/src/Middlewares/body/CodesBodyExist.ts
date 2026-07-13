import type { Request, Response, NextFunction } from 'express'
import { Plants } from '../../Models/Plants'
import { Machine } from '../../Models/Machine'
import { Codes } from '../../Models/Codes'

declare global{
    namespace Express{
        interface Request{
            codes:Codes
        }
    }
}

export const CodeBodyExist:any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.User.PlantId!=null){
            return next()
        }
        const { CodesId,defaultCode } = req.body
        const code = await Codes.findOne({
            where:[
                {
                    id:CodesId??defaultCode
                }
            ]
        })
        if (!code) {
            return res.status(404).json("Codigo no encontrado")
        }
        req.codes=code
        return next()
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error en la busqueda' })
    }
    
}