import express from "express";
import { auth } from "firebase-admin";
import { isAuthenticated } from "../../middleware/auth";
import { getAllUsers } from "../../controllers/getUser/controller";

const getAllRoutes = express.Router();

getAllRoutes.get("/users", isAuthenticated, getAllUsers);

export default getAllRoutes;
