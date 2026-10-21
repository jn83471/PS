import { Router } from "express";
import { body } from "express-validator";
import { UrsRequestFolioController } from "../../../../Controllers/Apps/Urs/UrsRequestFolioController";
import { autenticate, autenticateWithApps } from "../../../../Middlewares/params/auth";
import { UrsPriorityController } from "../../../../Controllers/Apps/Urs/UrsPriorityController";
import { UrsCatalogController } from "../../../../Controllers/Apps/Urs/UrsCatalogController";

const router=Router()

router.get("/",autenticateWithApps,UrsCatalogController.Catalog)

export default router