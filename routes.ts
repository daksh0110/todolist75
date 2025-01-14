import express, {Request,Response}from 'express';
const routes = express.Router();
import User from "./models/User"
import { encryption } from './services/hashing.bycrypt';
import { userRegister } from './controllers/user.Register';
import { userLogin } from './controllers/user.Login';
import { adminRegister } from './controllers/admin.register';
import { adminLogin } from './controllers/admin.login';

routes

        .post("/register",userRegister)
        .post("/login",userLogin)
        .post("/admin/register",adminRegister)
        .post("/admin/login",adminLogin)

export default routes;
