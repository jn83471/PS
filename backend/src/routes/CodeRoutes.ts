import { Router } from "express";
import { MachinesController } from "../Controllers/MachinesController";
import { autenticate } from "../Middlewares/params/auth";
import { handleInputErrors } from "../Middlewares/params/validation";
import { body } from "express-validator";
import { CodeController } from "../Controllers/CodeController";

const router=Router()
/*router.use(autenticate)
router.param('MachineId',validateMachineExcist)
*/
router.get('/',autenticate,CodeController.Index)
/*router.get('/:MachineId',MachinesController.Show)*/
router.post('/',
    body('name').notEmpty().withMessage("Necesita llenar el campo de nombre de maquina"),
    body('key').notEmpty().withMessage("Necesita llenar el campo de key de maquina"),
    body('server').notEmpty().withMessage("Necesita llenar el campo de server de maquina"),
    body('db').notEmpty().withMessage("Necesita llenar el campo de db de maquina"),
    handleInputErrors,
    /*autenticate,*/
    CodeController.Create)
/*router.put('/:MachineId',
    PlantsBodyExist,
    CodeBodyExist,
    body('machineCode').notEmpty().withMessage("Necesita llenar el campo de nombre de maquina"),
    handleInputErrors,
    MachinesController.Update)*/
router.delete('/:CodeId',CodeController.Delete)

export default router