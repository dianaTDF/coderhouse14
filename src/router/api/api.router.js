import { Router, json, urlencoded } from "express";
import { router as userRouter } from "./user.router.js";
import { router as productRouter } from "./product.router.js";
import { router as cartRouter } from "./cart.router.js";
import { errorHandler } from "../../middleware/errorHandler.js";
import { responseHander } from "../../middleware/responseHandler.js";

export const router = Router()



router.use(responseHander)


router.use(json())
router.use(urlencoded({ extended:true}))


router.use('/users',userRouter)
router.use('/products',productRouter)
router.use('/carts',cartRouter)

router.use(errorHandler)


/* 
router.get('/',(req,res)=>{
    res.json({'router':'api'})
}) 
*/