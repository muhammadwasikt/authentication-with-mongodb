import { transporter } from "./emailsender.js";
import dotenv from 'dotenv';


dotenv.config();

export const sendResetEmail = async (email, url) => {
    try {
        transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Password Reset Request',
            text: 'Click the link below to reset your password.',
            html: `
      <p><strong>Click the link below to reset your password:</strong></p>
      <a href=${url}>Reset Password</a>
    `
        })
        console.log('Reset email sent to:', email);
    }
    catch (error) {
        console.error('Error sending email:', error);
    }


}