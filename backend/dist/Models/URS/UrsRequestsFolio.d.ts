import { Model } from "sequelize";
export declare class UrsRequestsFolio extends Model {
    id: number;
    Qty: number;
    Verify: number;
    motive: string;
    RequestUserId: number;
    AprovedUserBy?: number;
    FinishUserBy?: number;
    RecibedUserBy?: number;
    Process: number;
    ProposedDate: string;
    DeliveryDay: string;
    ClosedDay: string;
    CancelDay: string;
    LastProcessDay: string;
    UrsPriorityId: number;
}
