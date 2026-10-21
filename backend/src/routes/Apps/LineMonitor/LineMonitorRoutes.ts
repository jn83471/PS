import { Router } from "express";
import { body } from "express-validator";
import { autenticate } from "../../../Middlewares/params/auth";
import { LineMonitorController } from "../../../Controllers/Apps/LineMonitor.ts/LineMonitorController";

const router=Router()
/*router.use(autenticate)
router.param('MachineId',validateMachineExcist)
*/
router.get('/',autenticate,LineMonitorController.Index)
/*router.get('/:MachineId',MachinesController.Show)*/

export default router