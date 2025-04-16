import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async function () {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_DB_URL}`);
    console.log("Db Connected successfully", connection.connections[0].host);
  } catch (error) {
    console.log("error", error);
    console.error("connection error", error);
    process.exit(1);
  }
};

export default connectDb;
