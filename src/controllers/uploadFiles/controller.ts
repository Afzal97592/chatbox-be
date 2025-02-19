import { Request } from "express";
import { uploadTOCloudinary } from "../../utils/uploadFileToCloudinary";
import { deleteLocalFile } from "../../utils/deleteLocal";

export const uploadFileController = async (
  req: Request,
  res: Response | any
): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let folder = "chatMedia";
    if (req.body.type === "profileImage") {
      folder = "profileImages";
    } else if (req.body.type === "image") {
      folder = "chatMedia/chatImages";
    } else if (req.body.type === "video") {
      folder = "chatMedia/chatVideos";
    } else if (req.body.type === "audio") {
      folder = "chatMedia/chatAudios";
    } else {
      folder = "chatMedia/documents";
    }

    const filePath = req.file.path;

    const uploadedResult = await uploadTOCloudinary(filePath, folder);

    // remove the local file
    deleteLocalFile(filePath);

    res.status(200).json({
      message: "File uploaded successfully",
      mediaUrl: uploadedResult.url,
      public_id: uploadedResult.public_Id,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};
