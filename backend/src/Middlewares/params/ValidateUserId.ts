import type { Request, Response, NextFunction } from 'express'
import { Users } from '../../Models/Users'

declare global{
    namespace Express{
        interface Request{
            users:Users
        }
    }
}

export const ValidateUserExcist:any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { UsersId } = req.params
        const user = await Users.findOne({
            where:[
                {
                    id:UsersId
                }
            ]
        })
        if (!user) {
            return res.status(404).json("Usuario no encontrado")
        }
        if (!user.status) {
            return res.status(404).send('Ya no se encuentra este usuario')
        }
        req.users=user
        return next()
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error en la busqueda' })
    }
    
}