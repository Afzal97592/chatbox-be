import express from "express";
import { getAllUsers } from "../../controllers/getUser/controller";
import { isAuthenticated } from "../../middleware/auth";

const getAllRoutes = express.Router();

getAllRoutes.get("/users", isAuthenticated, getAllUsers);

export default getAllRoutes;
