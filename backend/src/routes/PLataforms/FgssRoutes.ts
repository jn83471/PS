import { Router } from "express";
import { MachinesController } from "../../Controllers/MachinesController";
import { autenticate } from "../../Middlewares/params/auth";
import { handleInputErrors } from "../../Middlewares/params/validation";
import { body } from "express-validator";
import { CodeController } from "../../Controllers/CodeController";
import { FgssGenericController } from "../../Controllers/Plataforms/FGSS/FgssGenericController";
import { ValidateCode } from "../../Middlewares/params/ValidateCode";

const router = Router()
/*router.use(autenticate)

*/
//router.param('CodesId',ValidateCode)

router.get('/', autenticate, FgssGenericController.Index)

//partNumber
router.get('/SewspartNumberList/:CodesId',
    autenticate,
    ValidateCode,
    FgssGenericController.ParNumberList)
router.get('/SewspartNumberList/:CodesId/:PartNo',
    autenticate,
    ValidateCode,
    FgssGenericController.ParNumberListCustomers)
/*router.get('/:MachineId',MachinesController.Show)*/
router.get('/SewspartNumberList/:CodesId/:PartNo/:CustomerPartNumber',
    autenticate,
    ValidateCode,
    FgssGenericController.ParNumberListCustomersCustom)

export default router