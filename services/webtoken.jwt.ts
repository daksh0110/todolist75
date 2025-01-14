import jwt from 'jsonwebtoken';



export const generateToken=async (name:string,email:string):Promise<string> =>{
 
    const jwtSecretKey = "gfg_jwt_secret_key";
   
    try{
        let data = {
            name:name,
            email: email,
        }
        const token =  await jwt.sign(data, jwtSecretKey,{expiresIn:'10d'});
        console.log(token)
        return token
    } catch(e){
        throw new Error("unable to generate token");
    }
    
}

   