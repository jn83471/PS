"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../Middlewares/params/auth");
const validation_1 = require("../Middlewares/params/validation");
const PlantsController_1 = require("../Controllers/PlantsController");
const router = (0, express_1.Router)();
/*router.use(autenticate)
router.param('MachineId',validateMachineExcist)
*/
router.get('/', auth_1.autenticate, PlantsController_1.PlantsController.Index);
/*router.get('/:MachineId',MachinesController.Show)*/
router.post('/', auth_1.autenticate, validation_1.handleInputErrors, PlantsController_1.PlantsController.Create);
router.put('/:PlantId', auth_1.autenticate, validation_1.handleInputErrors, PlantsController_1.PlantsController.Update);
router.delete('/:PlantId', auth_1.autenticate, PlantsController_1.PlantsController.Delete);
exports.default = router;
//# sourceMappingURL=PlantRoutes.js.map