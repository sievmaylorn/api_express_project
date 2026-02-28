import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import * as UserModels from "../models/user.model.js"
import dotenv from "dotenv"
dotenv.config()
export const register = async (req,res) =>{
    const {name,email,password} = req.body
   try{
     
    const checkemail = await UserModels.findsOneuser(email)

    if(checkemail.rows.length>0){
        return res.status(409).json({
            message:"email is have already"
        })
    }

    const hashpass = await bcrypt.hash(password,10);

    const users = await UserModels.createUser(
        name,
        email,
        hashpass,
    )

    res.status(200).json({
        message:"Register already",
        data:users.rows[0]
    })

   }catch(err){
    console.log(err);
    res.status(500).json({
        message:"faild to register"
    })
    
   }

}


export const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const result = await UserModels.findsOneuser(email);
        if(result.rows.length==0){
            res.status(404).json({
                message:"User Is Not Found"
            })
        }
        const user = result.rows[0]

        const islogin = await bcrypt.compare(password, user.password)

        if(!islogin){
            res.status(404).json({
                message:"Wrong Password.."
            })
        }

        const token = jwt.sign(
            {id:user.id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXSPIRE_IN}
        )

        res.status(200).json({
            message:"Login Is Success",
            user,
            token
        })


    }catch(err){
        console.log(err);

        res.status(500).json({
            message:"Login Is Faild..."
        })
        
    }
}