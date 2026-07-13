import { Router } from "express";
import { autenticate } from "../Middlewares/params/auth";
import { ReportController } from "../Controllers/ReportController";

const router=Router()

router.get('/production',autenticate,ReportController.Report)
router.get('/IPD',ReportController.IPD)
router.get('/IPD/:Plantid',ReportController.IPDByPlant)


export default router