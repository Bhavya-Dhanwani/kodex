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
    secure: env_js_1.default.SMTP_PORT === 465, // true for 465, false for 587 or 2525
    auth: {
        user: env_js_1.default.SMTP_USER,
        pass: env_js_1.default.SMTP_PASS,
    },
    // Adding standard tls configuration to allow secure upgrades and prevent timeouts/cert blocks
    tls: {
        rejectUnauthorized: false
    }
});
exports.default = transporter;
