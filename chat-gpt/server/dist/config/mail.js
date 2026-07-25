"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_js_1 = __importDefault(require("./env.js"));
const transporter = nodemailer_1.default.createTransport({
    host: env_js_1.default.SMTP_HOST,
    port: env_js_1.default.SMTP_PORT,
    auth: {
        user: env_js_1.default.SMTP_USER,
        pass: env_js_1.default.SMTP_PASS,
    },
});
exports.default = transporter;
