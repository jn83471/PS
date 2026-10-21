"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateNow = exports.formatDate = exports.withTimeout = exports.normalizes = void 0;
const normalizes = (text) => {
    return text.replace(/\\+/g, "\\");
};
exports.normalizes = normalizes;
const withTimeout = (promise, ms) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms)),
    ]);
};
exports.withTimeout = withTimeout;
const formatDate = (date = new Date()) => {
    return [
        date.getFullYear(),
        String(date.getMonth() + 2).padStart(2, '0'),
        1
    ].join('-');
};
exports.formatDate = formatDate;
const formatDateNow = (date = new Date()) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    return [
        nextDate.getFullYear(),
        String(nextDate.getMonth() + 1).padStart(2, '0'),
        String(nextDate.getDate()).padStart(2, '0')
    ].join('-');
    /*return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()+1).padStart(2, '0')
    ].join('-');*/
};
exports.formatDateNow = formatDateNow;
//# sourceMappingURL=Gnr.js.map