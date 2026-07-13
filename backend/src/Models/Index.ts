
import { Machine } from "./Machine";
import { Codes } from "./Codes";
import { Plants } from "./Plants";
import { Clients } from "./Client";

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

export {
  Machine,
  Codes,
  Plants
};
