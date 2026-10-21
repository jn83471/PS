
import { Machine } from "./Machine";
import { Codes } from "./Codes";
import { Plants } from "./Plants";
import { Clients } from "./Client";
import { Users } from "./Users";
import { Rols } from "./Rols";
import { Departament } from "./Department";
import { Apps } from "./Apps";
import { UserHasApps } from "./UserHasApps";
import { AppsPermision } from "./AppsPermision";
import { UserHasPermisions } from "./UserHasPermisions";

// ✅ relaciones AQUÍ (NO en los modelos)
Machine.belongsTo(Codes, {
  foreignKey: "CodesId",
  as: "Codes"
});

Codes.hasMany(Machine, {
  foreignKey: "CodesId",
  as: "Machine"
});


Plants.belongsTo(Codes, {
  foreignKey: "defaultCode",
  as: "Code"
});


Codes.hasMany(Plants, {
  foreignKey: "defaultCode",
  as: "plant"
});




Machine.belongsTo(Plants, {
  foreignKey: "PlantId",
  as: "plant"
});

Machine.belongsTo(Clients, {
  foreignKey: "ClientsId",
  as: "Clients"
});

Plants.hasMany(Machine, {
  foreignKey: "PlantId",
  as: "Machine"
});

Users.belongsTo(Plants, { foreignKey: "PlantId", as: "Plants" });
Users.belongsTo(Rols, { foreignKey: "RolId", as: "Rols" });
Users.belongsTo(Departament, { foreignKey: "DepartmentId", as: "Departament" });



UserHasApps.belongsTo(Users, { foreignKey: "UserId", as: "Users" });
Users.hasMany(UserHasApps, {
  foreignKey: "UserId",
  as: "UserHasApps"
});

UserHasApps.belongsTo(Apps, { foreignKey: "AppsId", as: "Apps" });
Apps.hasMany(UserHasApps, {
  foreignKey: "AppsId",
  as: "UserHasApps"
});

AppsPermision.belongsTo(Apps, { foreignKey: "AppsId", as: "Apps" });
Apps.hasMany(AppsPermision, {
  foreignKey: "AppsId",
  as: "AppsPermision"
});

UserHasPermisions.belongsTo(Users, { foreignKey: "UserId", as: "Users" });
Users.hasMany(UserHasPermisions, {
  foreignKey: "UserId",
  as: "UserHasPermisions"
});

UserHasPermisions.belongsTo(AppsPermision, {
  foreignKey: "AppsPermisionId",
  as: "AppsPermision"
});
AppsPermision.hasMany(UserHasPermisions, {
  foreignKey: "AppsPermisionId",
  as: "UserHasPermisions"
});

/*UserHasPermisions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        AppsPermisionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: "UserHasPermisions"
    }
);

*/


export {
  Machine,
  Codes,
  Plants,
  Users,
  AppsPermision
};
