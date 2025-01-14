import express, {Request,Response}from 'express';
import Admin from "../models/Admin"
import { decryption, encryption } from '../services/hashing.bycrypt';
import { generateToken } from '../services/webtoken.jwt';

export const adminLogin=async (req:Request,res:Response)=>{
        const {name ,email,password}=req.body;
        const user=  await Admin.findOne({email: email });
        if (!user){
           
              res.send("This admin does'nt exist ");
        }else{
            if(await decryption(password,user.password)){
               const token= await generateToken(user.name,user.email);
                res.send(token);

            }else{
                res.send("password is incorrect");
            }
           
        }
       


}

