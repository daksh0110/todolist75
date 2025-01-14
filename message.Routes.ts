import express, { Request, Response } from "express";
import { adminCreate } from "./controllers/admin.create";
import { verifyAdmin } from "./middleware/verify.jwt";
const messageRoutes = express.Router();

messageRoutes.post("/admin/create/", verifyAdmin, adminCreate);
export default messageRoutes;
