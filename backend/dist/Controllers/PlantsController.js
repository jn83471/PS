"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantsController = void 0;
const Plants_1 = require("../Models/Plants");
const server_1 = require("../server");
const Codes_1 = require("../Models/Codes");
class PlantsController {
    static Index = async (req, res) => {
        if (req.User.PlantId != null) {
            const plants = await Plants_1.Plants.findAll({
                where: {
                    status: true,
                    id: req.User.PlantId
                },
                include: [
                    {
                        model: Codes_1.Codes,
                        as: "Code"
                    }
                ]
            });
            return res.json(plants);
        }
        const plants = await Plants_1.Plants.findAll({
            where: {
                status: true
            },
            include: [
                {
                    model: Codes_1.Codes,
                    as: "Code"
                }
            ]
        });
        return res.json(plants);
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
            if (!(req.User.Rols.CreatePlants)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const { name, defaultCode, type } = req.body;
            const plant = await Plants_1.Plants.create({
                name: name,
                defaultCode: defaultCode,
                type: type,
                APPKEY: '',
                status: true
            });
            const plants = await Plants_1.Plants.findOne({
                where: {
                    id: plant.id,
                    status: true
                },
                include: [
                    {
                        model: Codes_1.Codes,
                        as: "Code"
                    }
                ]
            });
            server_1.io.to("Plants").emit("newPlant", plants);
            return res.send("Se ha generado la planta");
        }
        catch (error) {
            return res.status(500).send("no se ha podido generar la planta debido a algun problema");
        }
    };
    static Update = async (req, res) => {
        try {
            if (!(req.User.Rols.CreatePlants)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const { PlantId } = req.params;
            const { name, defaultCode, type } = req.body;
            /* if (!req.plants.status) {
                 return res.status(404).send('Ya no se encuentra esta planta')
             }*/
            const plant = await Plants_1.Plants.update({
                name: name,
                defaultCode: defaultCode,
                type: type,
                status: true
            }, {
                where: [
                    {
                        id: PlantId
                    }
                ]
            });
            const plants = await Plants_1.Plants.findOne({
                where: {
                    id: PlantId,
                    status: true
                },
                include: [
                    {
                        model: Codes_1.Codes,
                        as: "Code"
                    }
                ]
            });
            server_1.io.to("Plants").emit("editPlant", plants);
            return res.send("Se ha modificado la planta");
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).send("no se ha podido modificar la planta debido a algun problema");
        }
    };
    static Delete = async (req, res) => {
        try {
            if (!(req.User.Rols.CreatePlants)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const { PlantId } = req.params;
            const plant = await Plants_1.Plants.update({
                status: false
            }, {
                where: [
                    {
                        id: PlantId
                    }
                ]
            });
            server_1.io.to("Plants").emit("deletePlant", { id: PlantId });
            return res.send("Se ha eliminado la planta");
        }
        catch (error) {
            return res.status(500).send("no se ha podido modificar la planta debido a algun problema");
        }
    };
}
exports.PlantsController = PlantsController;
//# sourceMappingURL=PlantsController.js.map