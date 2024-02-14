import { Router } from "express";
import { deleteAllController, deleteController, getAllController, getController, postController, putController } from "../../controller/user.controller.js";

export const router = Router()

/* router.get('/',(req,res)=>{
    res.json({'router':'user'})
}) */

router.get('/',getAllController)
router.get('/:_id',getController)
router.post('/',postController)
router.put('/:_id',putController)
router.delete('/',deleteAllController)
router.delete('/:_id',deleteController)