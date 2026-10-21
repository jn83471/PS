"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../Middlewares/params/auth");
const UrsPriorityController_1 = require("../../../../Controllers/Apps/Urs/UrsPriorityController");
const router = (0, express_1.Router)();
router.get("/", auth_1.autenticate, UrsPriorityController_1.UrsPriorityController.Index);
exports.default = router;
//# sourceMappingURL=UrsPriority.js.map