import express, {Request,Response}from 'express';
import User from "../models/User"
import { encryption } from '../services/hashing.bycrypt';
export const userRegister=async (req:Request,res:Response)=>{
        const {name ,email,password}=req.body;
        const user=  await User.findOne({email: email });
      
        if (!user){
            const newUser = new User({
                name: name,
                email: email,
                password:await encryption(password),
              });
              await newUser.save();
              res.send("new user added");
        }else{
            res.send("user already exists");
        }
       


}

