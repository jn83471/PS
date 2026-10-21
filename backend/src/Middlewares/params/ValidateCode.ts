import type { Request, Response, NextFunction } from 'express'
import { Plants } from '../../Models/Plants'
import { Machine } from '../../Models/Machine'
import { Codes } from '../../Models/Codes'



export const ValidateCode:any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { CodesId,defaultCode } = req.params
        const code = await Codes.findOne({
            where:[
                {
                    id:CodesId
                }
            ]
        })
        if (!code) {
            return res.status(404).json("Codigo no encontrado")
        }
        req.codes=code
        console.log(code)
        return next()
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Hubo un error en la busqueda' })
    }
    
}