import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const verifyToken = (token: string) => {
  let decodedToken;
  jwt.verify(token, SECRET_KEY, (err, decodedData) => {
    if (err) return;
    decodedToken = decodedData;
  });
  return decodedToken;
};

export const isAuthenticated = (
  req: Request | any,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token is required" });
  const decodedToken = verifyToken(token);
  if (!decodedToken) return res.status(404).json({ message: "Invalid token" });
  req.user = decodedToken;
  next();
};
