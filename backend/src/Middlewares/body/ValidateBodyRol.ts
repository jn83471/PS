import type { Request, Response, NextFunction } from 'express'
import { Plants } from '../../Models/Plants'
import { Machine } from '../../Models/Machine'
import { Rols } from '../../Models/Rols'


export const ValidateBodyRol:any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { RolId } = req.body
        const rol = await Rols.findOne({
            where:[
                {
                    id:RolId
                }
            ]
        })
        if (!rol) {
            return res.status(404).json("Rol no encontrado")
        }
        return next()
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: 'Hubo un error en la busquedas' })
    }
    
}