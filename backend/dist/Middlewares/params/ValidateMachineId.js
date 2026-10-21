"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMachineExcist = void 0;
const Machine_1 = require("../../Models/Machine");
const validateMachineExcist = async (req, res, next) => {
    try {
        const { MachineId } = req.params;
        const machine = await Machine_1.Machine.findOne({
            where: [
                {
                    id: MachineId
                }
            ]
        });
        if (!machine) {
            return res.status(404).json("Maquina no encontrada");
        }
        req.machines = machine;
        return next();
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error en la busqueda' });
    }
};
exports.validateMachineExcist = validateMachineExcist;
//# sourceMappingURL=ValidateMachineId.js.map