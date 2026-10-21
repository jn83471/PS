import { Router } from "express";
import { UserController } from "../Controllers/UserController";
import { ValidateUserExcist } from "../Middlewares/params/ValidateUserId";
import { autenticate } from "../Middlewares/params/auth";
import { handleInputErrors } from "../Middlewares/params/validation";
import { body } from "express-validator";
import { DownloadController } from "../Controllers/DownloadController";
import { LineMonitorController } from "../Controllers/Apps/LineMonitor.ts/LineMonitorController";

const router=Router()
router.use(autenticate)


router.get("/lineMonitor",LineMonitorController.Index)

export default router