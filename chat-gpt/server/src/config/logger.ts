import pino from "pino";
import type { Logger } from "pino";
import env from "./env.js";

const logger: Logger = pino({
    level: env.LOGGER_LEVEL,
    transport: {
        target: env.NODE_ENV == "production" ? "" : "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
        },
    },
});

export default logger;