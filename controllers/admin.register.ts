import express, {Request,Response}from 'express';
import Admin from "../models/Admin";
import { decryption, encryption } from '../services/hashing.bycrypt';
import { generateToken } from '../services/webtoken.jwt';

export const adminRegister=async (req:Request,res:Response)=>{
        const {name ,email,password}=req.body;
        const user=  await Admin.findOne({email: email });
      
        if (!user){
            const newUser = new Admin({
                name: name,
                email: email,
                password:await encryption(password),
              });
              await newUser.save();
              res.send("new admin added");
        }else{
            res.send("admin already exists");
        }
       


}
