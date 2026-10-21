"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeController = void 0;
const Plants_1 = require("../Models/Plants");
const server_1 = require("../server");
const Index_1 = require("../Models/Index");
const crypto_1 = require("../Utils/crypto");
class CodeController {
    static Index = async (req, res) => {
        const codes = await Index_1.Codes.findAll({
            where: {
                status: true,
            }
        });
        return res.json(codes);
    };
    /*if (!(req.User.Rols.CreatePlants)) {
            const error = new Error('No se cuenta con los permisos para esta accion en este usuario')
            return res.status(401).json({ error: error.message })
        }*/
    static Show = async (req, res) => {
        if (!req.plants.status) {
            return res.status(404).send('Ya no se encuentra esta planta');
        }
        return res.json(req.plants);
    };
    static Create = async (req, res) => {
        try {
            const { name, key, server, db, fgsServer, fgsdb } = req.body;
            const cr = (0, crypto_1.encrypt)(`${server}|${db}`);
            const fgs = (0, crypto_1.encrypt)(`${fgsServer}|${fgsdb}`);
            const code = await Index_1.Codes.create({ name, key, cryServer: cr, fgsServer: fgs });
            server_1.io.to("Codes").emit("newCode", code);
            return res.send("Se ha generado el codigó");
        }
        catch (error) {
            console.log(error);
            return res.status(500).send("no se ha podido generar la planta debido a algun problemas");
        }
    };
    static Update = async (req, res) => {
        try {
            const { PlantId } = req.params;
            const { name, parkings, type } = req.body;
            if (!req.plants.status) {
                return res.status(404).send('Ya no se encuentra esta planta');
            }
            const plant = await Plants_1.Plants.update({
                name: name,
                parkings: parkings,
                type: type,
                status: true
            }, {
                where: [
                    {
                        id: PlantId
                    }
                ]
            });
            server_1.io.to("Codes").emit("editCode", {
                id: PlantId,
                name: name,
                parkings: parkings,
                type: type,
            });
            return res.send("Se ha modificado la planta");
            return res.send("Se ha modificado la planta");
        }
        catch (error) {
            return res.status(500).send("no se ha podido modificar la planta debido a algun problema");
        }
    };
    static Delete = async (req, res) => {
        try {
            const { CodeId } = req.params;
            const code = await Index_1.Codes.update({
                status: false
            }, {
                where: [
                    {
                        id: CodeId
                    }
                ]
            });
            server_1.io.to("Codes").emit("deleteCode", { id: CodeId });
            return res.send("Se ha eliminado el codigo");
        }
        catch (error) {
            return res.status(500).send("no se ha podido modificar la planta debido a algun problema");
        }
    };
}
exports.CodeController = CodeController;
//# sourceMappingURL=CodeController.js.map