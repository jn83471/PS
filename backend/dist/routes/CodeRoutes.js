"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../Middlewares/params/auth");
const validation_1 = require("../Middlewares/params/validation");
const express_validator_1 = require("express-validator");
const CodeController_1 = require("../Controllers/CodeController");
const router = (0, express_1.Router)();
/*router.use(autenticate)
router.param('MachineId',validateMachineExcist)
*/
router.get('/', auth_1.autenticate, CodeController_1.CodeController.Index);
/*router.get('/:MachineId',MachinesController.Show)*/
router.post('/', (0, express_validator_1.body)('name').notEmpty().withMessage("Necesita llenar el campo de nombre de maquina"), (0, express_validator_1.body)('key').notEmpty().withMessage("Necesita llenar el campo de key de maquina"), (0, express_validator_1.body)('server').notEmpty().withMessage("Necesita llenar el campo de server de maquina"), (0, express_validator_1.body)('db').notEmpty().withMessage("Necesita llenar el campo de db de maquina"), validation_1.handleInputErrors, 
/*autenticate,*/
CodeController_1.CodeController.Create);
/*router.put('/:MachineId',
    PlantsBodyExist,
    CodeBodyExist,
    body('machineCode').notEmpty().withMessage("Necesita llenar el campo de nombre de maquina"),
    handleInputErrors,
    MachinesController.Update)*/
router.delete('/:CodeId', CodeController_1.CodeController.Delete);
exports.default = router;
//# sourceMappingURL=CodeRoutes.js.map