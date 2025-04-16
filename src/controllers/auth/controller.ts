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
    const username = `${name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")}_${Math.floor(Math.random() * 90000 + 10000)}`;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });
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

// update profile

export const updateUserProfile = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const { name, bio, isPublic, dob, profilePicture } = req.body;
    const userId = req.user.userId;

    const findUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { name, bio, isPublic, dob, profilePicture },
      },
      { new: true }
    );
    if (!findUser) return res.status(404).json({ message: "user not found" });
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: findUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};
