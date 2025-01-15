import { Request, Response } from "express";
import Task from "../models/Task";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

interface DecodedToken {
  email: string;
}

export const viewTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
      throw new Error("JWT secret key is not defined in the environment");
    }


    const decoded = jwt.verify(token, jwtSecretKey) as JwtPayload & DecodedToken;

    if (!decoded || typeof decoded !== "object" || !decoded.email) {
      res.status(401).json({ message: "Unauthorized: Invalid token payload" });
      return;
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const tasks = await Task.find({ assignedTo: user._id }).populate("assignedTo", "name email");

    res.status(200).json({
      message: `Tasks assigned to ${user.email}`,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching tasks" });
  }
};
