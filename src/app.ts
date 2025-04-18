import express from "express";
import router from "./routes/authRoutes/auth.routes";
import cors from "cors";
// import admin from "firebase-admin";
import path from "path";
import uploadROutes from "./routes/fileRoutes/upload.routes";
import { any } from "zod";
import getAllRoutes from "./routes/getUsers/getAll.routes";
import User from "./models/User";
import { usernameScript } from "./scripts/usernameScript";
import requestRoutes from "./routes/requests/request.routes";

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

// write the script for username query in registerd users
// usernameScript();

// export const bucket = admin.storage().bucket();
app.use("/api/v1/", router);
app.use("/api/v1/", uploadROutes);
app.use("/api/v1/", getAllRoutes);
app.use("/api/v1/friend-request/", requestRoutes);

export default app;
