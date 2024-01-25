import { Router } from "express";
import { router as userRouter } from "./user.router.js";
import { router as productRouter } from "./product.router.js";
import { router as cartRouter } from "./cart.router.js";

export const router = Router()



router.use((req,res,next)=>{
    res['created'] = (payload)=>{
        res.status(201).json({status: 'success',payload})
    }
    res['result'] = (payload)=>{
        res.status(200).json({status: 'success',payload})
    }
    next()
})


router.use('/users',userRouter)
router.use('/products',productRouter)
router.use('/carts',cartRouter)

router.use((error, req,res,next)=>{
    switch(error.type){
        case 'INVALID_ARGUMENT':
            res.status(400)
            break
        case 'FAILED_AUTHENTICATION':
            res.status(401)
            break
        default:
            res.status(500)
            break
    }
    res.json({
        status:'error',
        message:error.message
    })
})


/* 
router.get('/',(req,res)=>{
    res.json({'router':'api'})
}) 
*/