import mongoose, { Document } from "mongoose";

export interface UserTypes extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  dob?: Date;
  isPublic: boolean;
  friends: mongoose.Types.ObjectId[];
  friendsRequestSent: mongoose.Types.ObjectId[];
  friendsRequestReceived: mongoose.Types.ObjectId[];
  isOnline: boolean;
  lastSeen?: Date;
  fcmToken?: string;
  missedCalls: mongoose.Types.ObjectId[];
  stories: {
    mediaUrl: string;
    type: "image" | "video";
    createdAt: Date;
  };
}
