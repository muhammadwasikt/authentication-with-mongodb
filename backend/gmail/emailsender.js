import nodemailer from 'nodemailer'
import dotenv from 'dotenv'


dotenv.config()


export var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: process.env.EMAIL_SEND_PORT,
    secure: true,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false, 
    },
});