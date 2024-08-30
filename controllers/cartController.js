import userModel from "../models/userModel.js";
export const addToCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId) 
        console.log(req);
               
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({Success:true,message:"Added to cart"})
    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"error"})

        
        
    }

}
export const removeFromCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId)
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;

        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({Success:true,message:"removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"error"})

        
        
    }


}
export const getCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId)
        let cartData=await userData.cartData;
        res.json({Success:true,cartData,message:"here is the cartitems"})
    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"error"})

        
        
    }


}
