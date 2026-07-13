import { Router } from "express";
import { MachinesController } from "../Controllers/MachinesController";
import { autenticate } from "../Middlewares/params/auth";
import { handleInputErrors } from "../Middlewares/params/validation";
import { body } from "express-validator";
import { validateMachineExcist } from "../Middlewares/params/ValidateMachineId";
import { PlantsBodyExist } from "../Middlewares/body/PlantsBodyExist";
import { CodeBodyExist } from "../Middlewares/body/CodesBodyExist";
import { storage, fileFilter } from "../server";
import multer from "multer";
import { PlanController } from "../Controllers/PlanController";

const router=Router()
router.use(autenticate)
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // 5MB
});
router.get("/",PlanController.Index)
router.post("/", upload.single('Plan'),PlanController.Plan)

export default router