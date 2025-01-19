import mongoose from "mongoose";

import { UserRole } from '../model/UserRole.js';

export const UserSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true },
    bio: { type: mongoose.Schema.Types.String, required: false, },
    password: { type: mongoose.Schema.Types.String, required: true, },
    role: {
        type: mongoose.Schema.Types.String,
        enum: Object.values(UserRole),
    }
});

export const UserModel = mongoose.model('User', UserSchema);