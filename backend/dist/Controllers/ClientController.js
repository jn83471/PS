"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const server_1 = require("../server");
const Client_1 = require("../Models/Client");
const Codes_1 = require("../Models/Codes");
class ClientController {
    static Index = async (req, res) => {
        const plants = await Client_1.Clients.findAll({
            where: {
                status: true
            },
            include: [
                {
                    model: Codes_1.Codes,
                    as: "Codes"
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
        if (!req.Client.status) {
            return res.status(404).send('Ya no se encuentra este cliente');
        }
        return res.json(req.Client);
    };
    static Create = async (req, res) => {
        try {
            if (!(req.User.Rols.CreateClients)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const { defaultCode, name } = req.body;
            const client = await Client_1.Clients.create({
                name: name,
                defaultCode: defaultCode,
                status: true
            });
            const clients = await Client_1.Clients.findOne({
                where: {
                    id: client.id
                },
                include: [
                    {
                        model: Codes_1.Codes,
                        as: "Codes"
                    }
                ]
            });
            server_1.io.to("Client").emit("newClient", clients);
            return res.send("Se ha generado el cliente");
        }
        catch (error) {
            return res.status(500).send("no se ha podido generar el cliente debido a algun problema");
        }
    };
    static Update = async (req, res) => {
        try {
            if (!(req.User.Rols.CreateClients)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const { ClientId } = req.params;
            const { CodesId, name, defaultCode } = req.body;
            if (!(req.User.Rols.CreatePlants)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const client = await Client_1.Clients.update({
                CodesId, name, defaultCode
            }, {
                where: [
                    {
                        id: ClientId
                    }
                ]
            });
            const clients = await Client_1.Clients.findOne({
                where: {
                    id: ClientId,
                },
                include: [
                    {
                        model: Codes_1.Codes,
                        as: "Codes"
                    }
                ]
            });
            server_1.io.to("Client").emit("editClient", clients);
            return res.send("Se ha modificado el cliente");
        }
        catch (error) {
            return res.status(500).send("no se ha podido modificar el cliente debido a algun problema");
        }
    };
    static Delete = async (req, res) => {
        try {
            if (!(req.User.Rols.CreateClients)) {
                const error = new Error('No se cuenta con los permisos para esta accion en este usuario');
                return res.status(401).json({ error: error.message });
            }
            const { ClientId } = req.params;
            const plant = await Client_1.Clients.update({
                status: false
            }, {
                where: [
                    {
                        id: ClientId
                    }
                ]
            });
            server_1.io.to("Client").emit("deleteClient", { id: ClientId });
            return res.send("Se ha eliminado el cliente");
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).send("no se ha podido eliminar el cliente debido a algun problema");
        }
    };
}
exports.ClientController = ClientController;
//# sourceMappingURL=ClientController.js.map