"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = exports.storage = exports.uploadDir = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
const morgan_1 = __importDefault(require("morgan"));
const WelcomeController_1 = require("./Controllers/WelcomeController");
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
//routes
const node_path_1 = __importDefault(require("node:path"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const MachinesRoutes_1 = __importDefault(require("./routes/MachinesRoutes"));
const PlantRoutes_1 = __importDefault(require("./routes/PlantRoutes"));
const CodeRoutes_1 = __importDefault(require("./routes/CodeRoutes"));
const ReportRoutes_1 = __importDefault(require("./routes/ReportRoutes"));
const ClientRoutes_1 = __importDefault(require("./routes/ClientRoutes"));
const DownloadRoutes_1 = __importDefault(require("./routes/DownloadRoutes"));
const PlanRoutes_1 = __importDefault(require("./routes/PlanRoutes"));
const LineMonitorRoutes_1 = __importDefault(require("./routes/Apps/LineMonitor/LineMonitorRoutes"));
const fgssRoutes_1 = __importDefault(require("./routes/PLataforms/fgssRoutes"));
const UrsRequestFolioController_1 = __importDefault(require("./routes/Apps/Urs/Folio/UrsRequestFolioController"));
const UrsPriority_1 = __importDefault(require("./routes/Apps/Urs/Folio/UrsPriority"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const uploadsPath = node_path_1.default.join(__dirname, "../uploads");
const httpServer = (0, node_http_1.createServer)(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: cors_2.corsConfig
});
exports.uploadDir = node_path_1.default.join(__dirname, "../uploads");
if (!fs_1.default.existsSync(exports.uploadDir)) {
    fs_1.default.mkdirSync(exports.uploadDir);
}
exports.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, exports.uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only image files are allowed"));
    }
};
exports.fileFilter = fileFilter;
app.use("/uploads", express_1.default.static(uploadsPath));
app.use((0, cors_1.default)(cors_2.corsConfig));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.get('/', WelcomeController_1.WelcomeController.Index);
exports.io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("joinRoom", (roomName) => {
        socket.join(roomName);
        console.log(`Socket ${socket.id} unido al room ${roomName}`);
    });
});
/*app.use('/api/proyects',projectRouter)*/
app.use('/api/auth', AuthRoutes_1.default);
app.use('/api/machine', MachinesRoutes_1.default);
app.use('/api/plant', PlantRoutes_1.default);
app.use('/api/code', CodeRoutes_1.default);
app.use('/api/report', ReportRoutes_1.default);
app.use('/api/client', ClientRoutes_1.default);
app.use('/api/download', DownloadRoutes_1.default);
app.use('/api/plan', PlanRoutes_1.default);
//Plataforms
app.use("/api/fgss", fgssRoutes_1.default);
/* Apps */
//Line Monitor
app.use('/api/apps/linemonitor', LineMonitorRoutes_1.default);
//urs
app.use('/api/apps/urs/folios', UrsRequestFolioController_1.default);
app.use('/api/apps/urs/priority', UrsPriority_1.default);
exports.default = httpServer;
//# sourceMappingURL=server.js.map