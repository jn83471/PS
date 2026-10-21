import { Router } from "express";
import { body } from "express-validator";
import { UrsRequestFolioController } from "../../../../Controllers/Apps/Urs/UrsRequestFolioController";
import { autenticate, autenticateWithApps } from "../../../../Middlewares/params/auth";
import { UrsPriorityController } from "../../../../Controllers/Apps/Urs/UrsPriorityController";
import { UrsRequestController } from "../../../../Controllers/Apps/Urs/UrsRequestController";
import { validateUrsRequestFolioId } from "../../../../Middlewares/params/Urs/UrsRequestFolioId";
import { validateUrsRequestId } from "../../../../Middlewares/params/Urs/UrsRequesrId";

const router=Router()

router.param("ursFolioId",validateUrsRequestFolioId)
router.param("ursRequestId",validateUrsRequestId)

router.param("ursFolioId",validateUrsRequestFolioId)
router.get("/:ursFolioId",autenticateWithApps,UrsRequestController.Index)
router.get("/detail/:ursFolioDetailId",autenticateWithApps,UrsRequestFolioController.Deteail)
router.post("/:ursFolioId",autenticateWithApps,UrsRequestController.Create)
router.delete("/:ursFolioId/:ursRequestId",autenticateWithApps,UrsRequestController.Cancel)
router.put("/:ursFolioId/:ursRequestId/ProposedDate",autenticateWithApps,UrsRequestController.ProposedDate)

export default router