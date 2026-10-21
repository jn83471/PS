"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBodyExist = void 0;
const Codes_1 = require("../../Models/Codes");
const CodeBodyExist = async (req, res, next) => {
    try {
        if (req.User.PlantId != null) {
            return next();
        }
        const { CodesId, defaultCode } = req.body;
        const code = await Codes_1.Codes.findOne({
            where: [
                {
                    id: CodesId ?? defaultCode
                }
            ]
        });
        if (!code) {
            return res.status(404).json("Codigo no encontrado");
        }
        req.codes = code;
        return next();
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error en la busqueda' });
    }
};
exports.CodeBodyExist = CodeBodyExist;
//# sourceMappingURL=CodesBodyExist.js.map