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

//HourByhOUR
import HourByHourRoutes from './routes/Apps/HourXHour/HourByHourRoutes'
import hourByHourTimeRoutes from './routes/Apps/HourXHour/hourByHourTimeRoutes'


import LineMonitorRoutes from './routes/Apps/LineMonitor/LineMonitorRoutes'
import FgssRoutes from './routes/PLataforms/FgssRoutes'
//urs
import UrsRequestFolioController from './routes/Apps/Urs/Folio/UrsRequestFolioController'
import UrsPriority from './routes/Apps/Urs/Folio/UrsPriority'
import UrsCatalog from './routes/Apps/Urs/Folio/UrsCatalog'
import UrsRequest from './routes/Apps/Urs/Folio/UrsRequest'
import UrsScannRoutes from './routes/Apps/Urs/Scann/UrsScannRoutes'

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

  socket.on("disconnect", (reason) => {
    console.log(
      `Socket ${socket.id} desconectado. Razón: ${reason}`
    );
  });

});

/*app.use('/api/proyects',projectRouter)*/
app.use('/api/auth', authRoutes)
app.use('/api/machine', MachinesRoutes)
app.use('/api/plant', PlantRoutes)
app.use('/api/code', CodeRoutes)
app.use('/api/report', ReportRoutes)
app.use('/api/client', ClientRoutes)
app.use('/api/download', DownloadRoutes)
app.use('/api/plan', PlanRoutes)

//Plataforms
app.use("/api/fgss", FgssRoutes)

/* Apps */
//Line Monitor
app.use('/api/apps/linemonitor', LineMonitorRoutes)

//HOUR X HOUR
app.use('/api/apps/HourByHour', HourByHourRoutes)
app.use('/api/apps/HourByHour/Time', hourByHourTimeRoutes)

//urs
app.use('/api/apps/urs/folios', UrsRequestFolioController)
app.use('/api/apps/urs/priority', UrsPriority)
app.use('/api/apps/urs/catalog', UrsCatalog)
app.use('/api/apps/urs/request', UrsRequest)
app.use('/api/apps/urs/scann', UrsScannRoutes)


export default httpServer