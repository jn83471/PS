import type { Request, Response, NextFunction } from 'express'
import { UrsRequestsFolio } from '../../../Models/URS/UrsRequestsFolio'
import { Users } from '../../../Models/Users'
import { UrsPriority } from '../../../Models/URS/UrsPriority'
import { UrsRequests } from '../../../Models/URS/UrsRequests'

declare global {
    namespace Express {
        interface Request {
            UrsRequests: UrsRequests
        }
    }
}

export const validateUrsRequestId: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ursRequestId } = req.params
        const request = await UrsRequests.findOne({
            where: [
                {
                    id: ursRequestId
                }
            ]
        })
        if (!request) {
            return res.status(404).json("Requisición no encontrada")
        }
        req.UrsRequests = request
        return next()
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: 'Hubo un error en la busqueda' })
    }

}