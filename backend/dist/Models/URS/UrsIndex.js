"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrsPriority = exports.UrsRequestsFolio = void 0;
const Users_1 = require("../Users");
const UrsPriority_1 = require("./UrsPriority");
Object.defineProperty(exports, "UrsPriority", { enumerable: true, get: function () { return UrsPriority_1.UrsPriority; } });
const UrsRequestsFolio_1 = require("./UrsRequestsFolio");
Object.defineProperty(exports, "UrsRequestsFolio", { enumerable: true, get: function () { return UrsRequestsFolio_1.UrsRequestsFolio; } });
UrsRequestsFolio_1.UrsRequestsFolio.belongsTo(UrsPriority_1.UrsPriority, { foreignKey: "UrsPriorityId", as: "UrsPriority" });
UrsRequestsFolio_1.UrsRequestsFolio.belongsTo(Users_1.Users, { foreignKey: "RequestUserId", as: "RequestUser" });
UrsRequestsFolio_1.UrsRequestsFolio.belongsTo(Users_1.Users, { foreignKey: "AprovedUserBy", as: "AprovedUser" });
UrsRequestsFolio_1.UrsRequestsFolio.belongsTo(Users_1.Users, { foreignKey: "FinishUserBy", as: "FinishUser" });
UrsRequestsFolio_1.UrsRequestsFolio.belongsTo(Users_1.Users, { foreignKey: "RecibedUserBy", as: "RecibedUser" });
//# sourceMappingURL=UrsIndex.js.map