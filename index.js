import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
 const app=express()
 //middleware
 app.use(express.json())
 app.use(cors())
 //DB connection
 connectDB()
 //api endpoints
 app.use("/api/food",foodRouter)
 app.use("/api/user",userRouter)
 app.use("/api/cart",cartRouter)
 app.use('/api/order',orderRouter)
 app.use("/images",express.static("uploads"))
 app.get("/",(req,res)=>{
    res.send("server is working corrrectly")
 })

app.listen(process.env.PORT||8000)
