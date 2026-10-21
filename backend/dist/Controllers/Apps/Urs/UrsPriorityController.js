"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrsPriorityController = void 0;
const UrsIndex_1 = require("../../../Models/URS/UrsIndex");
class UrsPriorityController {
    static Index = async (req, res) => {
        const priority = await UrsIndex_1.UrsPriority.findAll();
        return res.json(priority);
    };
}
exports.UrsPriorityController = UrsPriorityController;
//# sourceMappingURL=UrsPriorityController.js.map