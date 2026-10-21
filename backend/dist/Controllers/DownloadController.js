"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadController = void 0;
const node_path_1 = __importDefault(require("node:path"));
class DownloadController {
    static Plan = async (req, res) => {
        const filePath = node_path_1.default.join(__dirname, '../archives/PlanFormat.xlsx');
        // Validación básica (puedes agregar JWT o sesión)
        /*if (!req.headers.authorization) {
            return res.status(401).send('No autorizado');
        }*/
        res.download(filePath, 'Plan.pdf', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al descargar');
            }
        });
    };
}
exports.DownloadController = DownloadController;
//# sourceMappingURL=DownloadController.js.map