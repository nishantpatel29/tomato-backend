import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import validator from 'validator'
const createToken=(id)=>{
    return jwt.sign({id},"random#secret")
}

//login user
 export const loginuser=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({Success:false,message:"User doesn't exist"})
        }
        const isMatch=await bycrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({Success:false,message:"Invalid credentials"})
        }
        const token=createToken(user._id)        
        return res.json({Success:true,token,message:"Successfully logged in"})

    } catch (error) {
        console.log("error");
        
        
    }

}

//register user
export const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
    
    try {
        //checking if user already exist or not
        const exist=await userModel.findOne({email})
        if(exist){
            return res.json({Success:false,message:"user already exist"});
        }
        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({Success:false,message:"Please enter valid email"});            
        }
        if(password.length<8){
            return res.json({Success:false,message:"please enter a strong password"});

        } 
        //creating account
        let salt= await bycrypt.genSalt(10);
        let hashedPassword=await bycrypt.hash(password,salt);
        let newUser=new userModel({name,email,password:hashedPassword})
        const user=await newUser.save()
        const token=createToken(user._id)
        res.json({Success:true,token,message:"user added successfully"})
       
    }
     catch (error) {
        console.log(error);
        res.json({Success:false,message:"error"})

        
        
    }

}
