import express from "express";
import { isAuthenticated } from "../../middleware/auth";
import { sendFriendRequest } from "../../controllers/request/sendFriendRequestController";
import acceptFriendRequest from "../../controllers/request/acceptFriendRequest";

const requestRoutes = express.Router();

requestRoutes.post("/send", isAuthenticated, sendFriendRequest);
requestRoutes.post("/accept/:senderId", isAuthenticated, acceptFriendRequest);

export default requestRoutes;
