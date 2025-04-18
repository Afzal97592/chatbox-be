import { Request, Response } from "express";
import User from "../../models/User";
import { send } from "process";

export const sendFriendRequest = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    // get current user which is sender request user
    const senderId = req.user.userId;
    const { receiverId } = req.body;

    if (!senderId)
      return res.status(400).json({ message: "senderId is required" });

    if (!receiverId)
      return res.status(400).json({ message: "receiverId is required" });

    // sender and receiver should not be same
    if (senderId === receiverId)
      return res
        .status(400)
        .json({ message: "You cannot send a request to yourself" });

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    // checking receiver exist or not in db

    if (!receiver)
      return res.status(404).json({ message: "Receiver not found" });

    // checking if receiver is already in sender friend list
    if (sender?.friends.includes(receiverId))
      return res.status(400).json({ message: "You are already friends" });

    // checking if sender already sent the request to receiver
    if (sender?.friendsRequestSent.includes(receiverId))
      return res.status(400).json({ message: "Request already sent" });

    // now save both
    sender?.friendsRequestSent.push(receiverId);
    receiver.friendsRequestReceived.push(senderId);

    await sender?.save();
    await receiver.save();
    return res.status(200).json({ message: "Request sent successfully" });
  } catch (error) {
    console.error("Error sending friend request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
