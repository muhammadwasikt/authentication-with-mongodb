import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyToken from '../utils/constant/verifyToken.js';
import crypto from 'crypto';
import { sendEmailVerification, sendResetEmail } from '../gmail/email.js';

export const userRoutes = express.Router()
dotenv.config()
const secret = process.env.JWT_SECRET

userRoutes.get('/', async (req, res) => {
    try {
        const Users = await User.find()
        res.status(200).send({ status: 200, message: "success", data: Users })
    } catch (error) {
        res.status(400).send({ status: 400, message: "something went wrong" })
    }
})

userRoutes.post('/register', async (req, res) => {
    try {
        const data = req.body;
        const { name, email, password } = data

        const otpId = Date.now().toString();
        const otp = otpId.slice(3,9)
        const otpExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        if (otp < 6) {
            return otp + 1
        }
        data.emailOtp = otp
        data.emailOtpExpiresAt = otpExpiresAt;

        // check unique user name
        const existingUserName = await User.findOne({ name });

        if (existingUserName) {
            return res.status(404).send({ status: 404, message: "User name already exists" });
        }

        // check unique email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(404).send({ status: 404, message: "Email already exists" });
        }

        // hash password
        const encryptPSW = await bcrypt.hash(password, 10);
        data.password = encryptPSW;


        const token = crypto.randomBytes(20).toString("hex");


        data.verificationToken = token

        sendEmailVerification(email, otp , token )

        // create new user
        const response = await User.create(data)
        res.status(201).send({ status: 201, message: "User registered successfully", data: response })
    } catch (error) {
        res.status(400).send({ status: 400, message: error.message })
    }
})
userRoutes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        
        if (!existingUser) {
            return res.status(404).send({ status: 404, message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        
        if (!isMatch) {
            return res.status(401).send({ status: 401, message: "Invalid credentials" })
        };
        
        if (existingUser.emailVerified === false) {
            return res.status(404).send({ status: 404, message: "Email not verified" });
        }
        const token = jwt.sign({ id: existingUser._id }, secret, { expiresIn: '1h' });

        res.status(200).send({ status: 200, message: "Login Successfully", data: token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
});

userRoutes.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).send({ status: 404, message: "User not found" })
        }

        const token = crypto.randomBytes(20).toString("hex");
        const tokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        existingUser.resetPasswordToken = token
        existingUser.resetPasswordTokenExpiresAt = tokenExpiresAt;

        await existingUser.save();

        sendResetEmail(email, `https://authenticationflow.vercel.app/reset-password/${token}`)

        res.status(200).send({ status: 200, message: "Email sent successfully", data: existingUser })

    }
    catch (error) {
        res.status(500).send({ status: 500, message: error });
    }
})

userRoutes.post('/reset-password/:token', async (req, res) => {

    const { password } = req.body;
    const { token } = req.params;
    try {
        const user = await User.findOne({ resetPasswordToken: token })

        if (!user) {
            return res.status(404).send({ status: 404, message: "Invalid token or expired" })
        }

        const hasPassword = await bcrypt.hash(password, 10);
        user.password = hasPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();
        res.status(200).send({ message: "Password updated successfully" })
    }
    catch (error) {
        res.status(400).send({ message: error.message })
    }

})

userRoutes.post('/email-verification/:token', async (req, res) => {

    const data = req.body;
    const { token } = req.params;
    try {
        const user = await User.findOne({ verificationToken: token })

        if (!user) {
            return res.status(404).send({ status: 404, message: "Invalid token or expired" })
        }

        if (!user.emailOtp === data) {
            return res.status(404).send({ status: 404, message: "Invalid otp or expired" })
        }
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        user.emailVerified = true;
        user.emailOtp = undefined;
        user.emailOtpExpiresAt = undefined;
        await user.save();
        res.status(200).send({status:200, message: "Email verified successfully" ,data: user.emailVerified})
    }
    catch (error) {
        res.status(400).send({ message: error })
    }

})

userRoutes.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "User not found" })
        };
        res.status(200).send({ status: 200, message: "User deleted successfully", data: user })
    } catch (error) {
        res.status(400).send({ status: 400, message: error.message })
    }
})

userRoutes.get("/protected", verifyToken, (req, res) => {
    try {
        res.status(200).send({ message: 'Access granted', data: req.user });
    } catch (error) {
        res.status(400).send();
    }
});