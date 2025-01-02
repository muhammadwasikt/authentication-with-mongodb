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

export const sendEmailVerification = async (email, otp , token) => {
    try {
        transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Email Verification',
            html: `
            <p style = 'margin: 10px auto'>Hi, <br> your email verification code is:</p>
            <h1 style = 'margin: 10px auto'>${otp}</h1>
            <p style ='margin: 10px auto'>Click the link below to verify your email.<a href=http://localhost:5173/email-verification/${token}>verify email</a></p>
            `,
        })
        console.log('Reset email sent to:', email);
    }
    catch (error) {
        console.error('Error sending email:', error);
    }


}