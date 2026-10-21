import { Codes } from "../Codes";
import { Users } from "../Users";
import { PriorityHasProcess } from "./PriorityHasProcess";
import { UrsFolioPictures } from "./UrsFolioPictures";
import { UrsPriority } from "./UrsPriority"
import { UrsProcess } from "./UrsProcess";
import { UrsRequests } from "./UrsRequests";
import { UrsRequestScannHistory } from "./UrsRequestScannHistory";
import { UrsRequestsFolio } from "./UrsRequestsFolio"

UrsRequestsFolio.belongsTo(UrsPriority, { foreignKey: "UrsPriorityId", as: "UrsPriority" });

UrsRequestsFolio.belongsTo(Users, { foreignKey: "RequestUserId", as: "RequestUser" });
UrsRequestsFolio.belongsTo(Users, { foreignKey: "AprovedUserBy", as: "AprovedUser" });
UrsRequestsFolio.belongsTo(Users, { foreignKey: "FinishUserBy", as: "FinishUser" });
UrsRequestsFolio.belongsTo(Users, { foreignKey: "RecibedUserBy", as: "RecibedUser" });
UrsRequestsFolio.belongsTo(Users, { foreignKey: "FinishUserSMTSBy", as: "FinishUserSMTS" });
UrsRequestsFolio.belongsTo(Users, {foreignKey: "ClosedUserId", as: "ClosedUser" });
UrsRequestsFolio.belongsTo(Users, {foreignKey: "SMTSLastVerificationUser", as: "SMTSLastVerificationU" });

UrsRequests.belongsTo(UrsRequestsFolio,{foreignKey:"UrsRequestsFolioId",as:"UrsRequestsFolio"})

UrsRequestsFolio.hasMany(UrsRequests, {
  foreignKey: "UrsRequestsFolioId",
  as: "UrsRequests"
});

UrsRequests.belongsTo(Codes, { foreignKey: "CodeId", as: "Codes" });
UrsRequests.belongsTo(UrsPriority, { foreignKey: "UrsPriorityId", as: "UrsPriority" });

PriorityHasProcess.belongsTo(UrsPriority,{foreignKey:"UrsPriorityId",as:"UrsPriority"})

UrsPriority.hasMany(PriorityHasProcess, {
  foreignKey: "UrsPriorityId",
  as: "PriorityHasProcess"
});

PriorityHasProcess.belongsTo(UrsProcess,{foreignKey:"UrsProcessId",as:"UrsProcess"})

UrsRequestScannHistory.belongsTo(UrsRequests,{foreignKey:"UrsRequestsId",as:"UrsRequests"})

UrsRequests.hasMany(UrsRequestScannHistory, {
  foreignKey: "UrsRequestsId",
  as: "UrsRequestScannHistory"
});

UrsFolioPictures.belongsTo(UrsRequestsFolio, {
    foreignKey: "UrsRequestsFolioId",
    as: "UrsRequestsFolio"
});

UrsFolioPictures.belongsTo(UrsProcess, {
    foreignKey: "UrsProcessId",
    as: "UrsProcess"
});

UrsRequestsFolio.hasMany(UrsFolioPictures, {
    foreignKey: "UrsRequestsFolioId",
    as: "UrsFolioPictures"
});

UrsProcess.hasMany(UrsFolioPictures, {
    foreignKey: "UrsProcessId",
    as: "UrsFolioPictures"
});




export{
    UrsRequestsFolio,
    UrsPriority,
    PriorityHasProcess,
    UrsRequests,
    UrsProcess
}