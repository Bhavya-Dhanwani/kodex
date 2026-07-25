"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendmail = sendmail;
const env_1 = require("../config/env");
const logger_1 = __importDefault(require("../config/logger"));
const mail_1 = __importDefault(require("../config/mail"));
/**
 * Sends an email using SMTP if SEND_MAIL is enabled.
 * Otherwise, logs the email details to the console.
 *
 * @param options Email options (to, subject, text, html)
 */
async function sendmail(options) {
    const mailDetails = {
        from: `CHAD-GPT <${env_1.env.MAIL_FROM}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
    };
    if (!env_1.env.SEND_MAIL) {
        logger_1.default.info({
            from: mailDetails.from,
            to: mailDetails.to,
            subject: mailDetails.subject,
            text: mailDetails.text,
            html: mailDetails.html,
        }, "SEND_MAIL is false. Logged email details.");
        return;
    }
    try {
        const info = await mail_1.default.sendMail(mailDetails);
        logger_1.default.info({ messageId: info.messageId }, "Email sent successfully");
    }
    catch (error) {
        logger_1.default.error({ err: error }, "Failed to send email");
        throw error;
    }
}
