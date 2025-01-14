import express, {Request,Response}from 'express';
import User from "../models/User"
import { decryption, encryption } from '../services/hashing.bycrypt';
import { generateToken } from '../services/webtoken.jwt';

export const userLogin=async (req:Request,res:Response)=>{
        const {name ,email,password}=req.body;
        const user=  await User.findOne({email: email });
        if (!user){
           
              res.send("This user does'nt exist ,please register first");
        }else{
            if(await decryption(password,user.password)){
               const token= await generateToken(user.name,user.email);
                res.send(token);

            }else{
                res.send("password is incorrect");
            }
           
        }
       


}

