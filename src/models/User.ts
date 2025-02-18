import mongoose from "mongoose";
import { UserTypes } from "../types/globalTypes";

const UserSchema = new mongoose.Schema<UserTypes>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    bio: { type: String, default: "" },
    dob: { type: Date },
    isPublic: { type: Boolean, default: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendsRequestSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendsRequestReceived: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date },
    fcmToken: { type: String },
    missedCalls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Call" }],
    stories: [
      {
        mediaUrl: { type: String, required: true },
        type: { type: String, enum: ["image", "video"], required: true },
        createdAt: { type: Date, default: Date.now, expires: "24h" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<UserTypes>("User", UserSchema);
