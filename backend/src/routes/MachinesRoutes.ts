import { Router } from "express";
import { MachinesController } from "../Controllers/MachinesController";
import { autenticate } from "../Middlewares/params/auth";
import { handleInputErrors } from "../Middlewares/params/validation";
import { body } from "express-validator";
import { validateMachineExcist } from "../Middlewares/params/ValidateMachineId";
import { PlantsBodyExist } from "../Middlewares/body/PlantsBodyExist";
import { CodeBodyExist } from "../Middlewares/body/CodesBodyExist";

const router=Router()
router.use(autenticate)
router.param('MachineId',validateMachineExcist)

router.get('/',MachinesController.Index)
router.get('/:MachineId',MachinesController.Show)
router.post('/',
    PlantsBodyExist,
    CodeBodyExist,
    body('machineCode').notEmpty().withMessage("Necesita llenar el campo de nombre de maquina"),
    handleInputErrors,
    MachinesController.Create)
router.put('/:MachineId',
    PlantsBodyExist,
    CodeBodyExist,
    body('machineCode').notEmpty().withMessage("Necesita llenar el campo de nombre de maquina"),
    handleInputErrors,
    autenticate,
    MachinesController.Update)
router.delete('/:MachineId',MachinesController.Delete)

export default router