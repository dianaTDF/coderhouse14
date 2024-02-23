import { Router } from "express";
import { deleteAllController, deleteController, getAllController, getController, postController, putController } from "../../controller/user.controller.js";
import passport from "passport";
import { onlyRol } from "../../middleware/authorization.js";

export const router = Router()

/* router.get('/',(req,res)=>{
    res.json({'router':'user'})
}) */

router.get('/',getAllController)
router.get('/current', 
passport.authenticate('jwt',{ failWithError: true, session: false }),
async(req,res,next)=>{
    console.log(req.user)
    res.jsonOk(req.user)
})
router.get('/getAll', 
    passport.authenticate('jwt',{ failWithError: true, session: false }),
    onlyRol('admin'),
    getAllController
    )
router.get('/:_id',getController)
router.post('/',postController)
router.put('/:_id',putController)
router.delete('/',deleteAllController)
router.delete('/:_id',deleteController)