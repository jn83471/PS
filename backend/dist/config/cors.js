"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
exports.corsConfig = {
    origin: function (origin, callback) {
        const whiteList = [
            process.env.FRONTEND,
            process.env.GAMBA,
            process.env.GAMBATEST
        ];
        if (process.argv[2] == "--api") {
            whiteList.push(undefined);
        }
        if (whiteList.includes(origin)) {
            callback(null, true);
        }
        else {
            console.log(process.env.FRONTEND);
            callback(new Error('Error de CORS'));
        }
    }
};
/*GAMBA=
GAMBATEST=*/ 
//# sourceMappingURL=cors.js.map