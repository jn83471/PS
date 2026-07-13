import { Router } from "express";
import { autenticate } from "../Middlewares/params/auth";
import { handleInputErrors } from "../Middlewares/params/validation";
import { body } from "express-validator";
import { PlantsController } from "../Controllers/PlantsController";

const router=Router()
/*router.use(autenticate)
router.param('MachineId',validateMachineExcist)
*/
router.get('/',autenticate,PlantsController.Index)
/*router.get('/:MachineId',MachinesController.Show)*/
router.post('/',autenticate,
    handleInputErrors,
    PlantsController.Create)
router.put('/:PlantId',
    autenticate,
    handleInputErrors,
    PlantsController.Update)
router.delete('/:PlantId',autenticate,PlantsController.Delete)

export default router