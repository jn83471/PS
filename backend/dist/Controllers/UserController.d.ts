import type { Request, Response } from "express";
export declare class UserController {
    static Index: any;
    static Show: any;
    static Create: any;
    static Update: any;
    static Delete: any;
    static Login: any;
    static ConfirmAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
