"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrsRequestFolioId = void 0;
const UrsRequestsFolio_1 = require("../../../Models/URS/UrsRequestsFolio");
const Users_1 = require("../../../Models/Users");
const UrsPriority_1 = require("../../../Models/URS/UrsPriority");
const validateUrsRequestFolioId = async (req, res, next) => {
    try {
        const { ursFolioId } = req.params;
        const machine = await UrsRequestsFolio_1.UrsRequestsFolio.findOne({
            where: [
                {
                    id: ursFolioId
                }
            ],
            include: [
                {
                    model: Users_1.Users,
                    as: "RequestUser"
                },
                {
                    model: Users_1.Users,
                    as: "AprovedUser"
                },
                {
                    model: Users_1.Users,
                    as: "FinishUser"
                },
                {
                    model: Users_1.Users,
                    as: "RecibedUser"
                },
                {
                    model: UrsPriority_1.UrsPriority,
                    as: "UrsPriority"
                }
            ]
        });
        if (!machine) {
            return res.status(404).json("Maquina no encontrada");
        }
        req.UrsRequestsFolio = machine;
        return next();
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error en la busqueda' });
    }
};
exports.validateUrsRequestFolioId = validateUrsRequestFolioId;
//# sourceMappingURL=UrsRequestFolioId.js.map