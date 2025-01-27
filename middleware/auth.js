import jwt from 'jsonwebtoken'
const authMiddleware=(req,res,next)=>{
    const {token}=req.headers ;    
    
    if(!token){
        return  res.json({Success:false,message:"not authorized Login again"})
    }
    try {
        const token_decode=jwt.verify(token,"random#secret")
            req.body.userId=token_decode.id;
            next()

        
    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"error"})
        
    }

}
export default authMiddleware