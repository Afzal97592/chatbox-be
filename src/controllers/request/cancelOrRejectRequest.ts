import { Request, Response } from "express";
import User from "../../models/User";
import { messaging } from "firebase-admin";


const cancelOrRejectRequest = async (req: Request | any, res: Response | any) => {
    try {
        const currentUserId = req.user.userId
        const otherUserId = req.params.id

        // check both users id exist or not
        if (!currentUserId) return res.status(400).json({ message: "Current user dose not exist" })
        if (!otherUserId) return res.status(400).json({ message: "User dose not exist" })

        // found users
        const currentUser = await User.findById(currentUserId)
        const otherUser = await User.findById(otherUserId)


        // check users exist or not
        if (!currentUser || !otherUser) {
            return res.status(400).json({ message: 'User not found' })
        }


        // filter and removed the matched ids
        currentUser.friendsRequestSent = currentUser.friendsRequestSent.filter((id) => id.toString() !== otherUserId)
        currentUser.friendsRequestReceived = currentUser.friendsRequestReceived.filter((id) => id.toString() !== otherUserId)

        otherUser.friendsRequestSent = currentUser.friendsRequestSent.filter((id) => id.toString() !== currentUserId)
        otherUser.friendsRequestReceived = currentUser.friendsRequestReceived.filter((id) => id.toString() !== currentUserId)

        // after modification save the users
        await currentUser.save()
        await otherUser.save()

        // return the response
        return res.status(200).json({ message: "Request cancelled successfully" })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export default cancelOrRejectRequest;