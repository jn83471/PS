import type { Request, Response } from "express";
import { Plants } from "../Models/Plants";
import { Users } from "../Models/Users";
import { Op } from "sequelize";
import { Rols } from "../Models/Rols";
import { checkPassword, hashPassword } from "../Utils/auth";
import { generateJWT } from "../Utils/jwt";

export class UserController {
    static Index: any = async (req: Request, res: Response) => {
        const users = await Users.findAll({
            where: {
                status: true,
            },
            include: [
                {
                    model: Rols,
                    as: "Rols",
                    where: [
                        {
                            Level: {
                                [Op.gt]: 0
                            }
                        }
                    ]
                },
                {
                    model: Plants,
                    as: "Plants",
                    required: false
                }
            ]
        })
        return res.json(users)
    }
    static Show: any = async (req: Request, res: Response) => {
        //return res.json(req.users)
    }
    static Create: any = async (req: Request, res: Response) => {
        try {
            if (!(req.User.Rols.CreateUsers)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }
            const { Name, Email, Password, RolId, PlantId, DepartmentId } = req.body
            const emailValidation = await Users.findOne({
                where: [
                    {
                        Email
                    }
                ]
            })
            if(emailValidation){
                const error = new Error('Correo ya registrado')
                return res.status(401).json({ error: error.message })
            }

            const Pass = await hashPassword(Password)
            const user = await Users.create({
                Name,
                Email,
                Password: Pass,
                RolId,
                PlantId,
                DepartmentId,
                status: true
            })
            return res.send("Se ha generado el usuario")
        } catch (error) {
            console.log(error.message)
            return res.status(500).send("no se ha podido generar la planta debido a algun problema")
        }

    }
    static Update: any = async (req: Request, res: Response) => {
        try {
            if (!(req.User.Rols.CreateUsers)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }
            const { Name, RolId, PlantId, DepartmentId } = req.body

            if (!req.User.status) {
                return res.status(404).send('Ya no se encuentra este usuario')
            }


            const user = await Users.update({
                Name,
                RolId,
                PlantId,
                DepartmentId
            }, {
                where: [
                    {
                        id: req.User.id
                    }
                ]
            })
            return res.send("Se ha modificado el usuario")
        } catch (error) {
            return res.status(500).send("no se ha podido modificar el usuario debido a algun problema")
        }
    }
    static Delete: any = async (req: Request, res: Response) => {
        try {
            if (!(req.User.Rols.CreateUsers)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }
            const user = await Users.update({
                status: false
            }, {
                where: [
                    {
                        id: req.users.id
                    }
                ]
            })
            return res.send("Se ha eliminado el usuario")
        } catch (error) {
            return res.status(500).send("no se ha podido eliminar el usuario debido a algun problema")
        }
    }
    static Login: any = async (req: Request, res: Response) => {
        try {
            const { Email, Password } = req.body
            const user = await Users.findOne({
                where: {
                    Email
                }
            })
            if (!user) {
                const error = new Error('Usuario y/o contrasena incorrecta')
                return res.status(401).json({ error: error.message })
            }
            if (!user.status) {
                const error = new Error('Usuario y/o contrasena incorrecta')
                return res.status(401).json({ error: error.message })
            }
            const resp = await checkPassword(Password, user.Password)
            if (!resp) {
                const error = new Error('Usuario y/o contrasena incorrecta')
                return res.status(401).json({ error: error.message })
            }
            const tk = generateJWT({ id: user.id })
            return res.send(tk)
        } catch (error) {
            console.log(error.message)
            return res.status(500).send("no se ha podido modificar la planta debido a algun problema")
        }
    }
    static ConfirmAccount = async (req: Request, res: Response) => {
        return res.json(req.User)
    }
}