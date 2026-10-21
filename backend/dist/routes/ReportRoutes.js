"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../Middlewares/params/auth");
const ReportController_1 = require("../Controllers/ReportController");
const router = (0, express_1.Router)();
router.get('/production', auth_1.autenticate, ReportController_1.ReportController.Report);
router.get('/IPD', ReportController_1.ReportController.IPD);
router.get('/IPD/:Plantid', ReportController_1.ReportController.IPDByPlant);
exports.default = router;
//# sourceMappingURL=ReportRoutes.js.map