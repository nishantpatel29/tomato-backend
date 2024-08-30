import expess from 'express'
import authMiddleware from '../middleware/auth.js'
import { adminOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js'
const orderRouter=expess.Router();
orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",adminOrders)
orderRouter.post("/status",updateStatus )
export default orderRouter