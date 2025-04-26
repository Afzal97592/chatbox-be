import { Request, Response } from "express";
import User from "../../models/User";
import mongoose from "mongoose";


const acceptFriendRequest = async (req: Request | any, res: Response | any) => {
    try {
        const { senderId } = req.params;
        const receiverId = req.user.userId;

        if (!senderId) {
            return res.status(400).json({ message: "Sender ID is required" });
        }
        if (!receiverId) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!receiver.friendsRequestReceived.includes(senderId)) {
            return res.status(400).json({ message: "No request found from this user" });
        }


        if (!sender.friends.includes(receiverId)) {
            sender.friends.push(receiverId);

        }
        if (!receiver.friends.includes(senderId)) {
            receiver.friends.push(senderId);
        }


        sender.friendsRequestSent = sender.friendsRequestSent.filter(
            (id) => id.toString() !== receiverId
        );

        receiver.friendsRequestReceived = receiver.friendsRequestReceived.filter(
            (id) => id.toString() !== senderId
        );

        await sender.save();
        await receiver.save();
        return res.status(200).json({ message: "Request accepted successfully" });


    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export default acceptFriendRequest;
