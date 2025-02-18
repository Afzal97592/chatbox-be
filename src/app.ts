import express from "express";
import router from "./routes/authRoutes/auth.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/", router);

export default app;
