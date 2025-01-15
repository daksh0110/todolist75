import express, { Request, Response } from "express";
import { adminCreate } from "./controllers/adminCreate";
import { verifyAdmin } from "./middleware/verify.jwt";
import { verifyUserOrAdmin } from "./middleware/verifyUserorAdmin";
import { viewTask } from "./controllers/viewTask";
import { reviewTask } from "./controllers/reviewTask";

const messageRoutes = express.Router();

messageRoutes
            .post("/admin/create/", verifyAdmin, adminCreate)
            .post("/task/",verifyUserOrAdmin,viewTask)
            .post("/task/:id",verifyUserOrAdmin,reviewTask)
export default messageRoutes;
