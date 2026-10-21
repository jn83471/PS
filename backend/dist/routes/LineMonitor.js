"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../Middlewares/params/auth");
const LineMonitorController_1 = require("../Controllers/Apps/LineMonitor.ts/LineMonitorController");
const router = (0, express_1.Router)();
router.use(auth_1.autenticate);
router.get("/lineMonitor", LineMonitorController_1.LineMonitorController.Index);
exports.default = router;
//# sourceMappingURL=LineMonitor.js.map