import { Request, Response, NextFunction } from "express";
import { messaging } from "firebase-admin";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema<any>): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      console.log("error", error);
      return res.status(400).json({ message: error.errors[0].message });
    }
  };
};
