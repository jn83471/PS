import { Router } from "express";
import { body } from "express-validator";
import { autenticate } from "../../../Middlewares/params/auth";
import { LineMonitorController } from "../../../Controllers/Apps/LineMonitor.ts/LineMonitorController";
import { HourByHourController } from "../../../Controllers/Apps/HourByHour/HourByHourController";

const router=Router()
/*router.use(autenticate)
router.param('MachineId',validateMachineExcist)
*/
router.post('/Details',autenticate,HourByHourController.Details)
/*router.get('/:MachineId',MachinesController.Show)*/

export default router