import { log } from "console";
import foodModel from "../models/foodModel.js";

import fs from 'fs'

//add food item
const addFood=async(req,res)=>{    
    const {name,description,price,category}=req.body
    const food=new foodModel({ name,description,price,category,image:req.file.filename})
    try {
        await food.save();
        res.json({Success:true,message:"Food added"})
    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"not added"})
        
        
    }

}




 export const listfood=async(req,res)=>{
    try {
        const foods=await foodModel.find();
        res.json({Success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"error"})

        
        
    }
}
export const removefood=async(req,res)=>{
    try {
        const food= await foodModel.findById(req.body._id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body._id)
        res.json({Success:true,message:"Food removed"})


    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"error"})

        
        
    }
}
export {addFood}