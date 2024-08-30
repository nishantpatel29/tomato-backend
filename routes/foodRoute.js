import express from 'express'
import { addFood, listfood ,removefood} from '../controllers/foodController.js'
import multer from 'multer'

//image storage engine
const storage=multer.diskStorage({
    destination:"uploads/",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)

    }
}) 
const upload=multer({storage})
const foodRouter=express.Router()
//paths
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listfood)
foodRouter.post("/remove",removefood)
export default foodRouter
