import express from 'express'
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js'
const cartRouter=express.Router();
cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.get("/getcart",authMiddleware,getCart)
cartRouter.post("/getcart",authMiddleware,getCart)
export default cartRouter