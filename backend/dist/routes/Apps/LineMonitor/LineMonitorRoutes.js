"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../Middlewares/params/auth");
const LineMonitorController_1 = require("../../../Controllers/Apps/LineMonitor.ts/LineMonitorController");
const router = (0, express_1.Router)();
/*router.use(autenticate)
router.param('MachineId',validateMachineExcist)
*/
router.get('/', auth_1.autenticate, LineMonitorController_1.LineMonitorController.Index);
/*router.get('/:MachineId',MachinesController.Show)*/
exports.default = router;
//# sourceMappingURL=LineMonitorRoutes.js.map