import { Request, Response } from "express";
import Task from "../models/Task";

export const reviewTask = async (req: Request, res: Response): Promise<void> => {
  try {
   
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }


    // Update the task status if it's pending
    if (task.status === "pending") {
      task.status = "done";
      await task.save();
      res.status(200).json({ message: "Task status updated to 'done'", task });
    } else {
      res.status(400).json({ message: "Task status is already 'done'" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while reviewing the task" });
  }
};
