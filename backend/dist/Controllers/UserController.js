"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const Plants_1 = require("../Models/Plants");
const Users_1 = require("../Models/Users");
const sequelize_1 = require("sequelize");
const Rols_1 = require("../Models/Rols");
const auth_1 = require("../Utils/auth");
const jwt_1 = require("../Utils/jwt");
class UserController {
    static Index = async (req, res) => {
        const users = await Users_1.Users.findAll({
            where: {
                status: true,
            },
            include: [
                {
                    model: Rols_1.Rols,
                    as: "Rols",
                    where: [
                        {
                            Level: {
                                [sequelize_1.Op.gt]: 0
                            }
                        }
                    ]
                },
                {
                    model: Plants_1.Plants,
                    as: "Plants",
                    required: false
                }
            ]
        });
        return res.json(users);
    };
    static Show = async (req, res) => {
        //return res.json(req.users)
    };
    static Create = async (req, res) => {
        try {
            if (!(req.User.Rols.CreateUsers)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const { Name, Email, Password, RolId, PlantId, DepartmentId } = req.body;
            const emailValidation = await Users_1.Users.findOne({
                where: [
                    {
                        Email
                    }
                ]
            });
            if (emailValidation) {
                const error = new Error('Correo ya registrado');
                return res.status(401).json({ error: error.message });
            }
            const Pass = await (0, auth_1.hashPassword)(Password);
            const user = await Users_1.Users.create({
                Name,
                Email,
                Password: Pass,
                RolId,
                PlantId,
                DepartmentId,
                status: true
            });
            return res.send("Se ha generado el usuario");
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).send("no se ha podido generar la planta debido a algun problema");
        }
    };
    static Update = async (req, res) => {
        try {
            if (!(req.User.Rols.CreateUsers)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const { Name, RolId, PlantId, DepartmentId } = req.body;
            if (!req.User.status) {
                return res.status(404).send('Ya no se encuentra este usuario');
            }
            const user = await Users_1.Users.update({
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
            });
            return res.send("Se ha modificado el usuario");
        }
        catch (error) {
            return res.status(500).send("no se ha podido modificar el usuario debido a algun problema");
        }
    };
    static Delete = async (req, res) => {
        try {
            if (!(req.User.Rols.CreateUsers)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const user = await Users_1.Users.update({
                status: false
            }, {
                where: [
                    {
                        id: req.users.id
                    }
                ]
            });
            return res.send("Se ha eliminado el usuario");
        }
        catch (error) {
            return res.status(500).send("no se ha podido eliminar el usuario debido a algun problema");
        }
    };
    static Login = async (req, res) => {
        try {
            const { Email, Password } = req.body;
            const user = await Users_1.Users.findOne({
                where: {
                    Email
                }
            });
            if (!user) {
                const error = new Error('Usuario y/o contrasena incorrecta');
                return res.status(401).json({ error: error.message });
            }
            if (!user.status) {
                const error = new Error('Usuario y/o contrasena incorrecta');
                return res.status(401).json({ error: error.message });
            }
            const resp = await (0, auth_1.checkPassword)(Password, user.Password);
            if (!resp) {
                const error = new Error('Usuario y/o contrasena incorrecta');
                return res.status(401).json({ error: error.message });
            }
            const tk = (0, jwt_1.generateJWT)({ id: user.id });
            return res.send(tk);
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).send("no se ha podido modificar la planta debido a algun problema");
        }
    };
    static ConfirmAccount = async (req, res) => {
        return res.json(req.User);
    };
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map