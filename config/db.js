import mongoose from "mongoose";
 export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://nishantpatel197322:9426179392@cluster0.tesnhal.mongodb.net/food-del").then(()=>console.log("Db connected"))

}
