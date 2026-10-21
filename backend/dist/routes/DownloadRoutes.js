"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../Middlewares/params/auth");
const DownloadController_1 = require("../Controllers/DownloadController");
const router = (0, express_1.Router)();
router.use(auth_1.autenticate);
router.get("/plan", DownloadController_1.DownloadController.Plan);
exports.default = router;
//# sourceMappingURL=DownloadRoutes.js.map