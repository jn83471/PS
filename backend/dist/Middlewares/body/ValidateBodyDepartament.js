"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateBodyDepartament = void 0;
const Department_1 = require("../../Models/Department");
const ValidateBodyDepartament = async (req, res, next) => {
    try {
        const { DepartmentId } = req.body;
        const rol = await Department_1.Departament.findOne({
            where: [
                {
                    id: DepartmentId
                }
            ]
        });
        if (!rol) {
            return res.status(404).json("Departamento no encontrado");
        }
        return next();
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Hubo un error en la busquedas' });
    }
};
exports.ValidateBodyDepartament = ValidateBodyDepartament;
//# sourceMappingURL=ValidateBodyDepartament.js.map