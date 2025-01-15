import { Request, Response } from "express";
import Task from "../models/Task";
import User from "../models/User";

export const adminCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, assignedToEmail } = req.body;

  if (!title || !description || !assignedToEmail) {
    res.status(400).json({ message: "All fields are required " });
    return;
  }

  try {
    const user = await User.findOne({ email: assignedToEmail });
    if (!user) {
      res.status(404).json({ message: "User does not exist." });
      return;
    }

    const newTask = new Task({
      title,
      description,
      assignedTo: user._id,
    });

    await newTask.save();

    res
      .status(201)
      .json({ message: "Task created and assigned", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the task." });
  }
};
