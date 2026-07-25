"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const env_js_1 = __importDefault(require("./env.js"));
const logger = (0, pino_1.default)({
    level: env_js_1.default.LOGGER_LEVEL,
    transport: {
        target: env_js_1.default.NODE_ENV == "production" ? "" : "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
        },
    },
});
exports.default = logger;
