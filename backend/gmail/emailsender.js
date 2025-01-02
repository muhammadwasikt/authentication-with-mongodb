import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false, 
    },
});
