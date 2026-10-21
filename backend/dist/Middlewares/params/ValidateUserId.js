"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUserExcist = void 0;
const Users_1 = require("../../Models/Users");
const ValidateUserExcist = async (req, res, next) => {
    try {
        const { UsersId } = req.params;
        const user = await Users_1.Users.findOne({
            where: [
                {
                    id: UsersId
                }
            ]
        });
        if (!user) {
            return res.status(404).json("Usuario no encontrado");
        }
        if (!user.status) {
            return res.status(404).send('Ya no se encuentra este usuario');
        }
        req.users = user;
        return next();
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error en la busqueda' });
    }
};
exports.ValidateUserExcist = ValidateUserExcist;
//# sourceMappingURL=ValidateUserId.js.map