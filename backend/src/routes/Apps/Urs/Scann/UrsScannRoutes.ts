import { Router } from "express";
import { body } from "express-validator";
import { UrsRequestFolioController } from "../../../../Controllers/Apps/Urs/UrsRequestFolioController";
import { autenticate, autenticateWithApps } from "../../../../Middlewares/params/auth";
import { UrsPriorityController } from "../../../../Controllers/Apps/Urs/UrsPriorityController";
import { UrsCatalogController } from "../../../../Controllers/Apps/Urs/UrsCatalogController";
import { UrsScannController } from "../../../../Controllers/Apps/Urs/UrsScannController";
import { validateUrsRequestFolioId } from "../../../../Middlewares/params/Urs/UrsRequestFolioId";

const router=Router()

router.param("ursFolioId",validateUrsRequestFolioId)

router.get("/:ursFolioId",autenticateWithApps,UrsScannController.ScannHistory)
router.post("/:ursFolioId",autenticateWithApps,UrsScannController.Scann)

export default router