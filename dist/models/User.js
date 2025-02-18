"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    bio: { type: String, default: "" },
    dob: { type: Date },
    isPublic: { type: Boolean, default: true },
    friends: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    friendsRequestSent: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    friendsRequestReceived: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    ],
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date },
    fcmToken: { type: String },
    missedCalls: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Call" }],
    stories: [
        {
            mediaUrl: { type: String, required: true },
            type: { type: String, enum: ["image", "video"], required: true },
            createdAt: { type: Date, default: Date.now, expires: "24h" },
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", UserSchema);
