"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClientExcist = void 0;
const Client_1 = require("../../Models/Client");
const validateClientExcist = async (req, res, next) => {
    try {
        const { ClientId } = req.params;
        const client = await Client_1.Clients.findOne({
            where: [
                {
                    id: ClientId
                }
            ]
        });
        if (!client) {
            return res.status(404).json("Cliente no encontrado");
        }
        req.Client = client;
        return next();
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error en la busqueda' });
    }
};
exports.validateClientExcist = validateClientExcist;
//# sourceMappingURL=ValidateClient.js.map