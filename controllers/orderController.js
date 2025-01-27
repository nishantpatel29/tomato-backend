import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
const stripe=new Stripe("sk_test_51PsLqw2NZek3tvzCNWjdp6OUISXKeNpW0QNbINyhGP4bKkzMp8ceH3Alw210jwPFtF55SQIPf8fmlv287oqkdBYn00soX7AOaX")
const url="https://tomato-nishant.netlify.app"
 export const placeOrder=async(req,res)=>{
try {
    const{userId,items,amount,address}=req.body
    const newOrder=new orderModel({userId,items,amount,address })
    await newOrder.save()
    
    await userModel.findByIdAndUpdate(userId,{cartData:{}});
    const line_items=items.map((item)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100,
        },
        quantity:item.quantity 
    }))
    
line_items.push({
    price_data:{
        currency:"usd",
        product_data:{
            name:"Delivery Charges"
        },
        unit_amount:10*100
    },quantity:1
})
const session=await stripe.checkout.sessions.create({
    line_items,
    mode:'payment',
    success_url:`${url}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${url}/verify?success=false&orderId=${newOrder._id}`,

})
res.json({Success:true,session_url:session.url})
} catch (error) {
    console.log(error);
res.json({Success:false,message:"error"})

    
}

 }
 export const verifyOrder=async(req,res)=>{
    const {orderId,Success}=req.body
    
    try {
        if(Success=="true"){
            
            
            let a=await orderModel.findByIdAndUpdate(orderId,{payment:true})
            console.log("check",a);
            res.json({Success:true,message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({Success:false,message:"not paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"error"});

        
    }

 }
 export const userOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({Success:true,data:orders})
        console.log(orders);
        
        
    } catch (error) {
        console.log("error");
        res.json({Success:false,message:"error"})

        
    }

 }

 //admin panel
 export const adminOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find();
        res.json({Success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"error"})

        
    }

 }
 export const updateStatus=async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({Success:true,message:"status updated"})
    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"error"})

        
    }
 }
