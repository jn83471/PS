import { Router } from "express";
import { body } from "express-validator";
import { UrsRequestFolioController } from "../../../../Controllers/Apps/Urs/UrsRequestFolioController";
import { autenticate, autenticateWithApps } from "../../../../Middlewares/params/auth";
import { validateUrsRequestFolioId } from "../../../../Middlewares/params/Urs/UrsRequestFolioId";
import { fileFilter, storage } from "../../../../server";
import multer from "multer";

const router=Router()
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // 5MB
});

router.param("ursFolioId",validateUrsRequestFolioId)

router.get("/",autenticateWithApps,UrsRequestFolioController.Index)
router.get("/:ursFolioId",autenticateWithApps,UrsRequestFolioController.Show)
router.delete("/:ursFolioId",autenticateWithApps,UrsRequestFolioController.Cancel)
router.post("/",autenticateWithApps,UrsRequestFolioController.Create)
router.post("/:ursFolioId/ChangePickUp",autenticateWithApps,UrsRequestFolioController.ChangePickUp)
router.post("/:ursFolioId/Verify",autenticateWithApps,upload.array("files"),UrsRequestFolioController.Verify)
router.get("/download/:ursFolioId",autenticateWithApps,UrsRequestFolioController.DownloadAsn)


export default router