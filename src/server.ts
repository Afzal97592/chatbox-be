import app from "./app";
import dotenv from "dotenv";
import connectDb from "./utils/dbConnection";
dotenv.config();

connectDb();

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on Port: ${process.env.PORT} Successfully!😊😊`);
});
