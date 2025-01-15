import express, { Request, Response } from "express";
import { adminCreate } from "./controllers/admin.create";
import { verifyAdmin } from "./middleware/verify.jwt";
import { verifyUserOrAdmin } from "./middleware/verifyUserorAdmin";
import { viewTask } from "./controllers/view.task";
const messageRoutes = express.Router();

messageRoutes
            .post("/admin/create/", verifyAdmin, adminCreate)
            .post("/task/",verifyUserOrAdmin,viewTask)
export default messageRoutes;
