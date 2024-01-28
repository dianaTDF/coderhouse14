import { Router } from "express";
import { deleteController, getController, postController, putController } from "../../controller/product.controller.js";

export const router = Router()

/* router.get('/',(req,res)=>{
    res.json({'router':'product'})
})
 */
router.get('/',getController)
router.post('/',postController)
router.put('/:_id',putController)
router.delete('/:_id',deleteController)