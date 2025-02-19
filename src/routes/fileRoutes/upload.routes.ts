import express from "express";
import multer from "multer";
import uploadToMulter from "../../middleware/multer";
import { uploadFileController } from "../../controllers/uploadFiles/controller";

const uploadROutes = express.Router();

uploadROutes.post(
  "/file/upload",
  uploadToMulter.single("file"),
  uploadFileController
);

export default uploadROutes;
