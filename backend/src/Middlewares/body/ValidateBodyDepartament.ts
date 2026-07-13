import type { Request, Response, NextFunction } from 'express'
import { Plants } from '../../Models/Plants'
import { Machine } from '../../Models/Machine'
import { Rols } from '../../Models/Rols'
import { Departament } from '../../Models/Department'


export const ValidateBodyDepartament:any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { DepartmentId } = req.body
        const rol = await Departament.findOne({
            where:[
                {
                    id:DepartmentId
                }
            ]
        })
        if (!rol) {
            return res.status(404).json("Departamento no encontrado")
        }
        return next()
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: 'Hubo un error en la busquedas' })
    }
    
}