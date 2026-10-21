"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateBodyRol = void 0;
const Rols_1 = require("../../Models/Rols");
const ValidateBodyRol = async (req, res, next) => {
    try {
        const { RolId } = req.body;
        const rol = await Rols_1.Rols.findOne({
            where: [
                {
                    id: RolId
                }
            ]
        });
        if (!rol) {
            return res.status(404).json("Rol no encontrado");
        }
        return next();
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Hubo un error en la busquedas' });
    }
};
exports.ValidateBodyRol = ValidateBodyRol;
//# sourceMappingURL=ValidateBodyRol.js.map