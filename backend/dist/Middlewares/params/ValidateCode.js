"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCode = void 0;
const Codes_1 = require("../../Models/Codes");
const ValidateCode = async (req, res, next) => {
    try {
        const { CodesId, defaultCode } = req.params;
        const code = await Codes_1.Codes.findOne({
            where: [
                {
                    id: CodesId
                }
            ]
        });
        if (!code) {
            return res.status(404).json("Codigo no encontrado");
        }
        req.codes = code;
        console.log(code);
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Hubo un error en la busqueda' });
    }
};
exports.ValidateCode = ValidateCode;
//# sourceMappingURL=ValidateCode.js.map