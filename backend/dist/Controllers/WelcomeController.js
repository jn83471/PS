"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeController = void 0;
const Apps_1 = require("../Models/Apps");
class WelcomeController {
    static Index = async (req, res) => {
        try {
            const plants = await Apps_1.Apps.findAll();
            return res.json(plants);
        }
        catch (error) {
            console.error(error); // full error
            console.error(error.message); // main message
            console.error(error.original); // MSSQL error
            res.status(500).json({ error: error.message });
        }
    };
}
exports.WelcomeController = WelcomeController;
//# sourceMappingURL=WelcomeController.js.map