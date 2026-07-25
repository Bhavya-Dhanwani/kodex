import { env } from "../config/env";
import logger from "../config/logger";
import transporter from "../config/mail";

export interface MailOptions {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
}

/**
 * Sends an email using SMTP if SEND_MAIL is enabled.
 * Otherwise, logs the email details to the console.
 * 
 * @param options Email options (to, subject, text, html)
 */
export async function sendmail(options: MailOptions): Promise<void> {
  const mailDetails = {
    from: `CHAD-GPT <${env.MAIL_FROM}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  if (!env.SEND_MAIL) {
    logger.info(
      {
        from: mailDetails.from,
        to: mailDetails.to,
        subject: mailDetails.subject,
        text: mailDetails.text,
        html: mailDetails.html,
      },
      "SEND_MAIL is false. Logged email details."
    );
    return;
  }

  try {
    const info = await transporter.sendMail(mailDetails);
    logger.info({ messageId: info.messageId }, "Email sent successfully");
  } catch (error) {
    logger.error({ err: error }, "Failed to send email");
    throw error;
  }
}
