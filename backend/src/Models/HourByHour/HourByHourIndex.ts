import { Machine } from "../Machine";
import { MachineEvents } from "./MachineEvents";
import { MachineTime } from "./MachineTime";

Machine.hasMany(MachineEvents, {
    foreignKey: "MachinesId",
    as:"MachineEvents"
});

MachineEvents.belongsTo(Machine, {
    foreignKey: "MachinesId",
    as:"Machine"
});

Machine.hasOne(MachineTime, {
    foreignKey: "MachinesId",
    as:"MachineTime"
});

MachineTime.belongsTo(Machine, {
    foreignKey: "MachinesId",
    as:"Machine"
});
export {
    MachineEvents,
    MachineTime
}