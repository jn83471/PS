"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachinesController = void 0;
const Plants_1 = require("../Models/Plants");
const server_1 = require("../server");
const Index_1 = require("../Models/Index");
const Client_1 = require("../Models/Client");
const sequelize_1 = require("sequelize");
class MachinesController {
    static Index = async (req, res) => {
        if (req.User.PlantId != null) {
            const machine = await Index_1.Machine.findAll({
                where: {
                    status: true,
                    PlantId: req.User?.PlantId
                },
                include: [
                    { model: Index_1.Codes, as: "Codes" },
                    { model: Plants_1.Plants, as: "plant" },
                    { model: Client_1.Clients, as: "Clients" }
                ]
            });
            return res.json(machine);
        }
        const machine = await Index_1.Machine.findAll({
            where: {
                status: true,
            },
            include: [
                { model: Index_1.Codes, as: "Codes" },
                { model: Plants_1.Plants, as: "plant" },
                { model: Client_1.Clients, as: "Clients" }
            ]
        });
        return res.json(machine);
    };
    static Show = async (req, res) => {
        if (!req.machines.status) {
            return res.status(404).send('Ya no se encuentra esta mauina');
        }
        return res.json(req.machines);
    };
    static Create = async (req, res) => {
        try {
            if (!(req.User.Rols.changeLayoutMachines)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const { CodesId, machineCode, ClientsId } = req.body;
            let PlantId;
            if (req.User.PlantId != null) {
                PlantId = req.User.PlantId;
            }
            else {
                PlantId = req.body.PlantId;
            }
            const ValidateName = await Index_1.Machine.findOne({
                where: [
                    {
                        machineCode: machineCode,
                        status: true
                    }
                ]
            });
            if (ValidateName) {
                const error = new Error('El codigo de planta ya se encuentra en uso');
                return res.status(401).json({ error: error.message });
            }
            const plant = await Index_1.Machine.create({
                PlantId,
                CodesId,
                machineCode,
                ClientsId,
                status: true
            });
            const newmachine = await Index_1.Machine.findOne({
                where: {
                    id: plant.id
                },
                include: [
                    { model: Index_1.Codes, as: "Codes" },
                    { model: Plants_1.Plants, as: "plant" },
                    { model: Client_1.Clients, as: "Clients" }
                ]
            });
            server_1.io.to("Machine").emit("newMachine", newmachine);
            return res.send("Se ha generado la maquina");
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).send("no se ha podido generar la maquina debido a algun problema");
        }
    };
    static Update = async (req, res) => {
        try {
            const { MachineId } = req.params;
            const { CodesId, machineCode, ClientsId } = req.body;
            let PlantId;
            if (req.User.PlantId != null) {
                PlantId = req.User.PlantId;
            }
            else {
                PlantId = req.body.PlantId;
            }
            if (!(req.User.Rols.changeLayoutMachines)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const ValidateName = await Index_1.Machine.findOne({
                where: [
                    {
                        machineCode: machineCode,
                        status: true,
                        id: {
                            [sequelize_1.Op.ne]: MachineId
                        }
                    }
                ]
            });
            if (ValidateName) {
                const error = new Error('El codigo de planta ya se encuentra en uso');
                return res.status(401).json({ error: error.message });
            }
            const plant = await Index_1.Machine.update({
                PlantId,
                CodesId,
                ClientsId,
                machineCode,
            }, {
                where: [
                    {
                        id: MachineId
                    }
                ]
            });
            const newmachine = await Index_1.Machine.findOne({
                where: {
                    id: MachineId
                },
                include: [
                    { model: Index_1.Codes, as: "Codes" },
                    { model: Plants_1.Plants, as: "plant" },
                    { model: Client_1.Clients, as: "Clients" }
                ]
            });
            server_1.io.to("Machine").emit("editMachine", newmachine);
            return res.send("Se ha modificado la maquina");
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).send("no se ha podido modificar la maquina debido a algun problema");
        }
    };
    static Delete = async (req, res) => {
        try {
            if (!(req.User.Rols.changeLayoutMachines)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const { MachineId } = req.params;
            if (req.User.PlantId != null) {
                const validatePlant = await Index_1.Machine.findOne({
                    where: [
                        {
                            id: MachineId
                        }
                    ]
                });
                if (!validatePlant) {
                    const error = new Error('No cuenta con los permisos para realizar esta operación');
                    return res.status(401).json({ error: error.message });
                }
                if (validatePlant.PlantId != req.User.PlantId) {
                    const error = new Error('No cuenta con los permisos para realizar esta operación');
                    return res.status(401).json({ error: error.message });
                }
            }
            const plant = await Index_1.Machine.update({
                status: false
            }, {
                where: [
                    {
                        id: MachineId
                    }
                ]
            });
            server_1.io.to("Machine").emit("deleteMachine", { id: MachineId });
            return res.send("Se ha eliminado la maquina");
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).send("no se ha podido modificar la maquina debido a algun problema");
        }
    };
}
exports.MachinesController = MachinesController;
//# sourceMappingURL=MachinesController.js.map