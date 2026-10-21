import { Router } from "express";
import { body } from "express-validator";
import { UrsRequestFolioController } from "../../../../Controllers/Apps/Urs/UrsRequestFolioController";
import { autenticate, autenticateWithApps } from "../../../../Middlewares/params/auth";
import { UrsPriorityController } from "../../../../Controllers/Apps/Urs/UrsPriorityController";

const router=Router()

router.get("/",autenticateWithApps,UrsPriorityController.Index)

export default router