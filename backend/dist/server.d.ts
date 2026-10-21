import { Server } from 'socket.io';
import multer, { FileFilterCallback } from 'multer';
import type { Request } from "express";
declare const httpServer: import("node:http").Server<typeof import("node:http").IncomingMessage, typeof import("node:http").ServerResponse>;
export declare const io: Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
export declare const uploadDir: string;
export declare const storage: multer.StorageEngine;
export declare const fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => void;
export default httpServer;
