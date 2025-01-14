const mongoose = require('mongoose');

export const initDB =async ():Promise<void> =>{
    try{
        await mongoose.connect("mongodb+srv://daksh75way:daksh1234@cluster0.07f9d.mongodb.net/todolist");
        console.log("connected")
    } catch(e){
        console.error('Error connecting to MongoDB:', e);
    }
}