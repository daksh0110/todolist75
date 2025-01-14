import express, { Request, Response } from 'express';
import { initDB } from './services/database.mongoose';
import dotenv from 'dotenv';
import routes from "./routes"
const app = express();
const port =  5000;
dotenv.config();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/api',routes);
  initDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });