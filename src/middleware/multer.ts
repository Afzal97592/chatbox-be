import multer from "multer";
import path from "path";
import fs from "fs";
import { error } from "console";

export const uploadFilePath = path.join(__dirname, "../../temp");

if (!fs.existsSync(uploadFilePath)) {
  fs.mkdirSync(uploadFilePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFilePath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${ext}`);
  },
});

const uploadToMulter = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowTypes = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "audio/mpeg",
      "application/pdf",
    ];
    if (allowTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      console.log("Invalid file type: " + file.mimetype);
      throw error("Invalid file type: " + file.mimetype);
    }
  },
});

export default uploadToMulter;
