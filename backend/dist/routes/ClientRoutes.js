"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../Middlewares/params/auth");
const validation_1 = require("../Middlewares/params/validation");
const express_validator_1 = require("express-validator");
const CodesBodyExist_1 = require("../Middlewares/body/CodesBodyExist");
const ClientController_1 = require("../Controllers/ClientController");
const ValidateClient_1 = require("../Middlewares/params/ValidateClient");
const router = (0, express_1.Router)();
router.use(auth_1.autenticate);
router.param('ClientId', ValidateClient_1.validateClientExcist);
router.get('/', ClientController_1.ClientController.Index);
router.get('/:ClientId', ClientController_1.ClientController.Show);
router.post('/', CodesBodyExist_1.CodeBodyExist, (0, express_validator_1.body)('name').notEmpty().withMessage("Necesita llenar el campo de nombre de cliente"), validation_1.handleInputErrors, ClientController_1.ClientController.Create);
router.put('/:ClientId', CodesBodyExist_1.CodeBodyExist, (0, express_validator_1.body)('name').notEmpty().withMessage("Necesita llenar el campo de nombre de maquina"), validation_1.handleInputErrors, ClientController_1.ClientController.Update);
router.delete('/:ClientId', ClientController_1.ClientController.Delete);
exports.default = router;
//# sourceMappingURL=ClientRoutes.js.map