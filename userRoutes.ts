import express, {Request,Response}from 'express';
const routes = express.Router();

import { userRegister } from './controllers/user.Register';
import { userLogin } from './controllers/user.Login';


routes

        .post("/register",userRegister)
        .post("/login",userLogin)
       

export default routes;
