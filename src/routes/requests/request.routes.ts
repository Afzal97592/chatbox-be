import express from "express";
import { isAuthenticated } from "../../middleware/auth";
import { sendFriendRequest } from "../../controllers/request/sendFriendRequestController";

const requestRoutes = express.Router();

requestRoutes.get("/send", isAuthenticated, sendFriendRequest);

export default requestRoutes;
