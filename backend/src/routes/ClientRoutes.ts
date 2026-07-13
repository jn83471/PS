import { Router } from "express";
import { MachinesController } from "../Controllers/MachinesController";
import { autenticate } from "../Middlewares/params/auth";
import { handleInputErrors } from "../Middlewares/params/validation";
import { body } from "express-validator";
import { validateMachineExcist } from "../Middlewares/params/ValidateMachineId";
import { PlantsBodyExist } from "../Middlewares/body/PlantsBodyExist";
import { CodeBodyExist } from "../Middlewares/body/CodesBodyExist";
import { PlantsController } from "../Controllers/PlantsController";
import { ClientController } from "../Controllers/ClientController";
import { validateClientExcist } from "../Middlewares/params/ValidateClient";

const router=Router()
router.use(autenticate)
router.param('ClientId',validateClientExcist)

router.get('/',ClientController.Index)
router.get('/:ClientId',ClientController.Show)

router.post('/',
    CodeBodyExist,
    body('name').notEmpty().withMessage("Necesita llenar el campo de nombre de cliente"),
    handleInputErrors,
    ClientController.Create)
router.put('/:ClientId',
    CodeBodyExist,
    body('name').notEmpty().withMessage("Necesita llenar el campo de nombre de maquina"),
    handleInputErrors,
    ClientController.Update)
router.delete('/:ClientId', ClientController.Delete)

export default router