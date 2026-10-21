
import jsw from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { Rols } from '../../Models/Rols'
import { Plants } from '../../Models/Plants'
import { Departament } from '../../Models/Department'
import { UserHasApps } from '../../Models/UserHasApps'
import { Apps } from '../../Models/Apps'
import { AppsPermision } from '../../Models/AppsPermision'
import { Users } from '../../Models/Index'
import { UserHasPermisions } from '../../Models/UserHasPermisions'

declare global {
    namespace Express {
        interface Request {
            User?: Users,
            UserHasPermisions?: UserHasPermisions[]
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
                        model: Departament,
                        as: "Departament"
                    },
                    {
                        model: UserHasApps,
                        as: "UserHasApps",
                        include: [
                            {
                                model: Apps,
                                as: "Apps",
                                
                            }
                        ]
                    },

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
        console.log(error.message)
        res.status(500).json({ error: "Token no valido" })
    }


    next()
}

export const autenticateWithApps: any = async (req: Request, res: Response, next: NextFunction) => {

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
                        model: Departament,
                        as: "Departament"
                    },
                    {
                        model: UserHasApps,
                        as: "UserHasApps",
                        include: [
                            {
                                model: Apps,
                                as: "Apps",
                                include: [
                                    {
                                        model: AppsPermision,
                                        as: "AppsPermision",
                                        required:false,
                                        include: [
                                            {
                                                model: UserHasPermisions,
                                                as: "UserHasPermisions",
                                                required:false,
                                                where: {
                                                    UserId: decoded.id
                                                },
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },

                ]
            })
            if (!user) {
                res.status(500).json({ error: "Token no valido" })
            }

            const apps = await UserHasPermisions.findAll({
                where: [{
                    UserId: user.id
                }],
                include: [
                    {
                        model: AppsPermision,
                        as: "AppsPermision",
                        include: [{
                            model: Apps,
                            as: "Apps"
                        }]
                    }
                ]
            })
            /*UserHasPermisions.belongsTo(Apps, { foreignKey: "AppsPermisionId", as: "Apps" });
Apps.hasMany(AppsPermision, {
  foreignKey: "AppsPermisionId",
  as: "UserHasPermisions"
});*/
            req.UserHasPermisions = apps
            req.User = user
        }
        else {
            res.status(500).json({ error: "Token no valido" })
        }

    }
    catch (error) {

        console.log(error.message)
        console.log(AppsPermision.associations);
        console.log(AppsPermision.getAttributes());
        res.status(500).json({ error: "Hubo algun error en la consulta de informacion" })
    }


    next()
}