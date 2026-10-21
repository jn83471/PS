"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantsBodyExist = void 0;
const Plants_1 = require("../../Models/Plants");
const PlantsBodyExist = async (req, res, next) => {
    try {
        if (req.User.PlantId != null) {
            return next();
        }
        const { PlantId } = req.body;
        const plant = await Plants_1.Plants.findOne({
            where: [
                {
                    id: PlantId
                }
            ]
        });
        if (!plant) {
            return res.status(404).json("Planta no encontrada");
        }
        req.plants = plant;
        return next();
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error en la busqueda' });
    }
};
exports.PlantsBodyExist = PlantsBodyExist;
//# sourceMappingURL=PlantsBodyExist.js.map