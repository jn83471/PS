import { Router } from "express";
import { autenticate } from "../../../Middlewares/params/auth";
import { HourByHourTimeController } from "../../../Controllers/Apps/HourByHour/HourByHourTimeController";
import { validateMachineExcist } from "../../../Middlewares/params/ValidateMachineId";




const router=Router()
router.param('MachineId',validateMachineExcist)
router.use(autenticate)

router.get('/',HourByHourTimeController.Index)
router.get('/:MachineId',HourByHourTimeController.Show)
router.post('/:MachineId',HourByHourTimeController.Create)



export default router