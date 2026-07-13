
import jsw from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { Users } from '../../Models/Users'
import { Rols } from '../../Models/Rols'
import { Plants } from '../../Models/Plants'
import { Departament } from '../../Models/Department'

declare global {
    namespace Express {
        interface Request {
            User?: Users
        }
    }
}

export const autenticate: any = async (req: Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization
    if (!bearer) {
        const error = new Error('No autorizado')
        return res.status(500).json({ error: error.message })
    }

    const [, token] = bearer.split(' ')

    try {
        const decoded = jsw.verify(token, process.env.JWTSECRET)
        if (typeof decoded === 'object' && decoded.id) {
            const user = await Users.findOne({
                where: [
                    {
                        id: decoded.id
                    }
                ],
                include: [
                    {
                        model: Rols,
                        as: "Rols"
                    },
                    {
                        model: Plants,
                        as: "Plants",
                        required: false
                    },
                    {
                        model:Departament,
                        as:"Departament"
                    }
                ]
            })
            if (!user) {
                res.status(500).json({ error: "Token no valido" })
            }
            req.User = user
        }
        else {
            res.status(500).json({ error: "Token no valido" })
        }

    }
    catch (error) {
        res.status(500).json({ error: "Token no valido" })
    }


    next()
}