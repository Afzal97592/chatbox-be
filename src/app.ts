import express from "express";
import router from "./routes/authRoutes/auth.routes";
import cors from "cors";
// import admin from "firebase-admin";
import path from "path";
import uploadROutes from "./routes/fileRoutes/upload.routes";
import { any } from "zod";
import getAllRoutes from "./routes/getUsers/getAll.routes";

// const serviceAccount = require(path.join(
//   __dirname,
//   "./config/firebaseServiceKey.json"
// ));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: "chat-app-6555c",
// });

const app = express();
app.use(cors());
app.use(express.json());

// export const bucket = admin.storage().bucket();
app.use("/api/v1/", router);
app.use("/api/v1/", uploadROutes);
app.use("/api/v1/", getAllRoutes);

export default app;
