import { Router } from "express";
import { getController, postController } from "../../controller/product.controller.js";

export const router = Router()

/* router.get('/',(req,res)=>{
    res.json({'router':'product'})
})
 */
router.get('/',getController)

router.post('/',postController)