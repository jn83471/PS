"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UrsRequestFolioController_1 = require("../../../../Controllers/Apps/Urs/UrsRequestFolioController");
const auth_1 = require("../../../../Middlewares/params/auth");
const UrsRequestFolioId_1 = require("../../../../Middlewares/params/Urs/UrsRequestFolioId");
const router = (0, express_1.Router)();
router.param("ursFolioId", UrsRequestFolioId_1.validateUrsRequestFolioId);
router.get("/", auth_1.autenticate, UrsRequestFolioController_1.UrsRequestFolioController.Index);
router.get("/:ursFolioId", auth_1.autenticate, UrsRequestFolioController_1.UrsRequestFolioController.Show);
router.post("/", auth_1.autenticate, UrsRequestFolioController_1.UrsRequestFolioController.Create);
exports.default = router;
//# sourceMappingURL=UrsRequestFolioController.js.map