"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = require("express");
const auth_1 = require("../Middlewares/params/auth");
const server_1 = require("../server");
const multer_1 = __importDefault(require("multer"));
const PlanController_1 = require("../Controllers/PlanController");
const router = (0, express_1.Router)();
router.use(auth_1.autenticate);
exports.upload = (0, multer_1.default)({
    storage: server_1.storage,
    fileFilter: server_1.fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // 5MB
});
router.get("/", PlanController_1.PlanController.Index);
router.post("/", exports.upload.single('Plan'), PlanController_1.PlanController.Plan);
router.get("/planview", exports.upload.single('Plan'), PlanController_1.PlanController.PlanView);
exports.default = router;
//# sourceMappingURL=PlanRoutes.js.map