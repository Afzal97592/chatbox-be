import { Request, Response } from "express";
import dotenv from "dotenv";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

// User signup controller
export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    // check if user already
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate the token

    // const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, {
    //   expiresIn: "7d",
    // });
    res.status(201).json({ message: "signup successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const signin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(404).json({ message: "Invalid email or password" });

    // Generate the token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "signin successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
