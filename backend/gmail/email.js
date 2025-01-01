import { transporter } from "./emailsender.js";


export const sendResetEmail = async ( email , url ) => {
    transporter.sendMail({
        from: 'noreply@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: 'Click the link below to reset your password.',
        html: `
      <p><strong>Click the link below to reset your password:</strong></p>
      <a href=${url}>Reset Password</a>
    `
    }, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Email sent:', info.response);
        }
    }
    )

    
}