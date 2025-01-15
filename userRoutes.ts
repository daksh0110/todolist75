import express, {Request,Response}from 'express';
const routes = express.Router();

import { userRegister } from './controllers/userRegister';
import { userLogin } from './controllers/userLogin';


routes

        .post("/register",userRegister)
        .post("/login",userLogin)
       

export default routes;
