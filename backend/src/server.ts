import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { corsConfig } from './config/cors'
import morgan from 'morgan'
import { WelcomeController } from './Controllers/WelcomeController'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

//routes
import path from 'node:path'
import multer, { FileFilterCallback } from 'multer'
import type { Request, Response } from "express";
import fs from "fs";


import authRoutes from './routes/AuthRoutes'
import MachinesRoutes from './routes/MachinesRoutes'
import PlantRoutes from './routes/PlantRoutes'
import CodeRoutes from './routes/CodeRoutes'
import ReportRoutes from './routes/ReportRoutes'
import ClientRoutes from './routes/ClientRoutes'
import DownloadRoutes from './routes/DownloadRoutes'
import PlanRoutes from './routes/PlanRoutes'
dotenv.config()

const app = express()
const uploadsPath = path.join(__dirname, "../uploads");
const httpServer = createServer(app);
export const io = new Server(httpServer, {
    cors: corsConfig
});


export const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


export const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb
  ) => {
    cb(null, uploadDir);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb
  ) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});


export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};


app.use("/uploads", express.static(uploadsPath));
app.use(cors(corsConfig))
app.use(morgan('dev'))

app.use(express.json())

app.get('/', WelcomeController.Index)

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinRoom", (roomName) => {
        socket.join(roomName);
        console.log(`Socket ${socket.id} unido al room ${roomName}`);
    });

});

/*app.use('/api/proyects',projectRouter)*/
app.use('/api/auth',authRoutes)
app.use('/api/machine',MachinesRoutes)
app.use('/api/plant',PlantRoutes)
app.use('/api/code',CodeRoutes)
app.use('/api/report',ReportRoutes)
app.use('/api/client',ClientRoutes)
app.use('/api/download',DownloadRoutes)
app.use('/api/plan',PlanRoutes)

export default httpServer