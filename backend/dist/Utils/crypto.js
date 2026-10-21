"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const encrypt = (text) => {
    const key = Buffer.from(process.env.key, "hex");
    const iv = Buffer.from(process.env.iv, "hex");
    const cipher = crypto_1.default.createCipheriv("aes-256-cbc", key, iv);
    console.log(cipher);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};
exports.encrypt = encrypt;
const decrypt = (encrypted) => {
    const key = Buffer.from(process.env.key, "hex");
    const iv = Buffer.from(process.env.iv, "hex");
    const decipher = crypto_1.default.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};
exports.decrypt = decrypt;
//# sourceMappingURL=crypto.js.map