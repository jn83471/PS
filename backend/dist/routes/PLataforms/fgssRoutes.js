"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../Middlewares/params/auth");
const FgssGenericController_1 = require("../../Controllers/Plataforms/FGSS/FgssGenericController");
const ValidateCode_1 = require("../../Middlewares/params/ValidateCode");
const router = (0, express_1.Router)();
/*router.use(autenticate)

*/
//router.param('CodesId',ValidateCode)
router.get('/', auth_1.autenticate, FgssGenericController_1.FgssGenericController.Index);
//partNumber
router.get('/SewspartNumberList/:CodesId', auth_1.autenticate, ValidateCode_1.ValidateCode, FgssGenericController_1.FgssGenericController.ParNumberList);
router.get('/SewspartNumberList/:CodesId/:PartNo', auth_1.autenticate, ValidateCode_1.ValidateCode, FgssGenericController_1.FgssGenericController.ParNumberListCustomers);
/*router.get('/:MachineId',MachinesController.Show)*/
exports.default = router;
//# sourceMappingURL=fgssRoutes.js.map