import { Router } from "express";
import { UserController } from "../Controllers/UserController";
import { ValidateUserExcist } from "../Middlewares/params/ValidateUserId";
import { autenticate } from "../Middlewares/params/auth";
import { handleInputErrors } from "../Middlewares/params/validation";
import { body } from "express-validator";
import { DownloadController } from "../Controllers/DownloadController";

const router=Router()
router.use(autenticate)


router.get("/plan",DownloadController.Plan)

export default router