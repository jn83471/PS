import type { Request, Response, NextFunction } from 'express'
import { UrsRequestsFolio } from '../../../Models/URS/UrsRequestsFolio'
import { Users } from '../../../Models/Index'
import { UrsPriority, UrsProcess } from '../../../Models/URS/UrsIndex'
import { PriorityHasProcess } from '../../../Models/URS/UrsIndex'
import { UrsFolioPictures } from '../../../Models/URS/UrsFolioPictures'

declare global {
    namespace Express {
        interface Request {
            UrsRequestsFolio: UrsRequestsFolio
        }
    }
}

export const validateUrsRequestFolioId: any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ursFolioId } = req.params
        const machine = await UrsRequestsFolio.findOne({
            where: [
                {
                    id: ursFolioId
                }
            ],
            include: [
                {
                    model: Users,
                    as: "RequestUser"
                },
                {
                    model: Users,
                    as: "AprovedUser"
                },
                {
                    model: Users,
                    as: "FinishUser"
                },
                {
                    model: Users,
                    as: "RecibedUser"
                },
                {
                    model: Users,
                    as: "FinishUserSMTS"
                },
                {
                    model: UrsPriority,
                    as: "UrsPriority",
                    include: [
                        {
                            model: PriorityHasProcess,
                            as: "PriorityHasProcess",
                            include: [
                                {
                                    model: UrsProcess,
                                    as: "UrsProcess"
                                }
                            ]
                        }
                    ]
                }
                ,
                {
                    model: UrsFolioPictures,
                    as: "UrsFolioPictures"
                }
            ]
        })
        if (!machine) {
            return res.status(404).json("Solicitud no encontrada")
        }
        req.UrsRequestsFolio = machine
        return next()
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: 'Hubo un error en la busqueda' })
    }

}