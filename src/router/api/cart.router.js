import { Router } from "express";
import { deleteController,deleteProductController,getAllController ,getController, postController, putController, putProductController } from "../../controller/cart.controller.js";

export const router = Router()

/* router.get('/',(req,res)=>{
    res.json({'router':'cart'})
}) */

router.get('/:_id',getAllController)
router.get('/',getController)
router.post('/',postController)
router.put('/:_id',putController)
router.delete('/:_id',deleteController)
//por hacer
router.put('/:_id/products/:_pid',putProductController)
router.delete('/:_id/products/:_pid',deleteProductController)