"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrsRequestFolioController = void 0;
const Index_1 = require("../../../Models/Index");
const UrsIndex_1 = require("../../../Models/URS/UrsIndex");
const server_1 = require("../../../server");
class UrsRequestFolioController {
    static Index = async (req, res) => {
        const plants = await UrsIndex_1.UrsRequestsFolio.findAll({
            include: [
                {
                    model: Index_1.Users,
                    as: "RequestUser"
                },
                {
                    model: Index_1.Users,
                    as: "AprovedUser"
                },
                {
                    model: Index_1.Users,
                    as: "FinishUser"
                },
                {
                    model: Index_1.Users,
                    as: "RecibedUser"
                },
                {
                    model: UrsIndex_1.UrsPriority,
                    as: "UrsPriority"
                }
            ]
        });
        return res.json(plants);
    };
    static Show = async (req, res) => {
        if (!req.UrsRequestsFolio) {
            return res.status(404).send('Ya no se encuentra esta mauina');
        }
        return res.json(req.UrsRequestsFolio);
    };
    static Create = async (req, res) => {
        try {
            /*if (!(req.User.Rols.CreateClients)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
                return res.status(401).json({ error: error.message })
            }*/
            const { ProposedDate, UrsPriorityId, motive } = req.body;
            const Request = await UrsIndex_1.UrsRequestsFolio.create({
                RequestUserId: req.User.id,
                Qty: 0,
                Verify: 0,
                Process: 0,
                ProposedDate,
                UrsPriorityId,
                motive
            });
            server_1.io.to("Urs").emit("Request", Request);
            return res.json(Request);
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).send("no se ha podido generar el cliente debido a algun problema");
        }
    };
}
exports.UrsRequestFolioController = UrsRequestFolioController;
//# sourceMappingURL=UrsRequestFolioController.js.map