import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface DecodedToken {
  email: string;
}

export const verifyUserOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
      throw new Error("JWT secret key is not defined in the environment");
    }

    const decoded = jwt.verify(token, jwtSecretKey) as DecodedToken;

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      res.status(403).json({ message: "Forbidden: User access required" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
