import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    name: { type: String},
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: 'user' },
    isActive: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpiresAt: { type: Date },
}, {timestamps: true })


const User = mongoose.model('User', UserSchema);

export default User;