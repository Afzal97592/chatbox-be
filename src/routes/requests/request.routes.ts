import express from "express";
import { isAuthenticated } from "../../middleware/auth";
import { sendFriendRequest } from "../../controllers/request/sendFriendRequestController";
import acceptFriendRequest from "../../controllers/request/acceptFriendRequest";
import cancelOrRejectRequest from "../../controllers/request/cancelOrRejectRequest";

const requestRoutes = express.Router();

requestRoutes.post("/send", isAuthenticated, sendFriendRequest);
requestRoutes.post("/accept/:senderId", isAuthenticated, acceptFriendRequest);
requestRoutes.post("/delete/request/:id", isAuthenticated, cancelOrRejectRequest);

export default requestRoutes;
