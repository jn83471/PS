"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsPermision = exports.Users = exports.Plants = exports.Codes = exports.Machine = void 0;
const Machine_1 = require("./Machine");
Object.defineProperty(exports, "Machine", { enumerable: true, get: function () { return Machine_1.Machine; } });
const Codes_1 = require("./Codes");
Object.defineProperty(exports, "Codes", { enumerable: true, get: function () { return Codes_1.Codes; } });
const Plants_1 = require("./Plants");
Object.defineProperty(exports, "Plants", { enumerable: true, get: function () { return Plants_1.Plants; } });
const Client_1 = require("./Client");
const Users_1 = require("./Users");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return Users_1.Users; } });
const Rols_1 = require("./Rols");
const Department_1 = require("./Department");
const Apps_1 = require("./Apps");
const UserHasApps_1 = require("./UserHasApps");
const AppsPermision_1 = require("./AppsPermision");
Object.defineProperty(exports, "AppsPermision", { enumerable: true, get: function () { return AppsPermision_1.AppsPermision; } });
const UserHasPermisions_1 = require("./UserHasPermisions");
// ✅ relaciones AQUÍ (NO en los modelos)
Machine_1.Machine.belongsTo(Codes_1.Codes, {
    foreignKey: "CodesId",
    as: "Codes"
});
Codes_1.Codes.hasMany(Machine_1.Machine, {
    foreignKey: "CodesId",
    as: "Machine"
});
Plants_1.Plants.belongsTo(Codes_1.Codes, {
    foreignKey: "defaultCode",
    as: "Code"
});
Codes_1.Codes.hasMany(Plants_1.Plants, {
    foreignKey: "defaultCode",
    as: "plant"
});
Machine_1.Machine.belongsTo(Plants_1.Plants, {
    foreignKey: "PlantId",
    as: "plant"
});
Machine_1.Machine.belongsTo(Client_1.Clients, {
    foreignKey: "ClientsId",
    as: "Clients"
});
Plants_1.Plants.hasMany(Machine_1.Machine, {
    foreignKey: "PlantId",
    as: "Machine"
});
Users_1.Users.belongsTo(Plants_1.Plants, { foreignKey: "PlantId", as: "Plants" });
Users_1.Users.belongsTo(Rols_1.Rols, { foreignKey: "RolId", as: "Rols" });
Users_1.Users.belongsTo(Department_1.Departament, { foreignKey: "DepartmentId", as: "Departament" });
UserHasApps_1.UserHasApps.belongsTo(Users_1.Users, { foreignKey: "UserId", as: "Users" });
Users_1.Users.hasMany(UserHasApps_1.UserHasApps, {
    foreignKey: "UserId",
    as: "UserHasApps"
});
UserHasApps_1.UserHasApps.belongsTo(Apps_1.Apps, { foreignKey: "AppsId", as: "Apps" });
Apps_1.Apps.hasMany(UserHasApps_1.UserHasApps, {
    foreignKey: "AppsId",
    as: "UserHasApps"
});
AppsPermision_1.AppsPermision.belongsTo(Apps_1.Apps, { foreignKey: "AppsId", as: "Apps" });
Apps_1.Apps.hasMany(AppsPermision_1.AppsPermision, {
    foreignKey: "AppsId",
    as: "AppsPermision"
});
UserHasPermisions_1.UserHasPermisions.belongsTo(Users_1.Users, { foreignKey: "UserId", as: "Users" });
Users_1.Users.hasMany(AppsPermision_1.AppsPermision, {
    foreignKey: "UserId",
    as: "UserHasPermisions"
});
UserHasPermisions_1.UserHasPermisions.belongsTo(Apps_1.Apps, { foreignKey: "AppsPermisionId", as: "Apps" });
Apps_1.Apps.hasMany(AppsPermision_1.AppsPermision, {
    foreignKey: "AppsPermisionId",
    as: "UserHasPermisions"
});
//# sourceMappingURL=Index.js.map