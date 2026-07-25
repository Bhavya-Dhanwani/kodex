import nodemailer from "nodemailer";
import env from "./env.js";

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465, // true for 465, false for 587 or 2525
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
    // Adding standard tls configuration to allow secure upgrades and prevent timeouts/cert blocks
    tls: {
        rejectUnauthorized: false
    }
});

export default transporter;