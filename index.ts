import express, { Request, Response } from "express";
import { initDB } from "./services/database.mongoose";
import dotenv from "dotenv";
import routes from "./routes";
import messageRoutes from "./message.Routes";
const app = express();
const port = 5000;
dotenv.config();
initDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use("/", messageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
