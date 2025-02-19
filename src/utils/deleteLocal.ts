import fs from "fs";
import path from "path";

export const deleteLocalFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("File deleted successfully", filePath);
    }
  } catch (error) {
    console.error("Error deleting file", error);
  }
};
