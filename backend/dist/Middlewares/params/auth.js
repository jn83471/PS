"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = require("../../Models/Users");
const Rols_1 = require("../../Models/Rols");
const Plants_1 = require("../../Models/Plants");
const Department_1 = require("../../Models/Department");
const UserHasApps_1 = require("../../Models/UserHasApps");
const Apps_1 = require("../../Models/Apps");
const autenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = new Error('No autorizado');
        return res.status(500).json({ error: error.message });
    }
    const [, token] = bearer.split(' ');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWTSECRET);
        if (typeof decoded === 'object' && decoded.id) {
            const user = await Users_1.Users.findOne({
                where: [
                    {
                        id: decoded.id
                    }
                ],
                include: [
                    {
                        model: Rols_1.Rols,
                        as: "Rols"
                    },
                    {
                        model: Plants_1.Plants,
                        as: "Plants",
                        required: false
                    },
                    {
                        model: Department_1.Departament,
                        as: "Departament"
                    },
                    {
                        model: UserHasApps_1.UserHasApps,
                        as: "UserHasApps",
                        include: [
                            {
                                model: Apps_1.Apps,
                                as: "Apps" /*,
                                include:[{
                                    model: AppsPermision,
                                    as:"AppsPermision"
                                }]*/
                            }
                        ]
                    }
                ]
            });
            /*AppsPermision.belongsTo(Apps, { foreignKey: "AppsId", as: "Apps" });
            Apps.hasMany(AppsPermision, {
              foreignKey: "AppsId",
              as: "AppsPermision"
            });
            
            UserHasPermisions.belongsTo(Users, { foreignKey: "UserId", as: "Users" });
            Users.hasMany(AppsPermision, {
              foreignKey: "UserId",
              as: "UserHasPermisions"
            });
            
            UserHasPermisions.belongsTo(Apps, { foreignKey: "AppsPermisionId", as: "Apps" });
            Apps.hasMany(AppsPermision, {
              foreignKey: "AppsPermisionId",
              as: "UserHasPermisions"
            });*/
            if (!user) {
                res.status(500).json({ error: "Token no valido" });
            }
            req.User = user;
        }
        else {
            res.status(500).json({ error: "Token no valido" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Token no valido" });
    }
    next();
};
exports.autenticate = autenticate;
//# sourceMappingURL=auth.js.map