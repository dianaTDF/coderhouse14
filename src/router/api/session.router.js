import { Router } from "express"
//import { getDao as UserDao } from "../../daos/user/user.dao.js"
import { loginController } from "../../controller/user.controller.js";
import { tokenInCookieDelete, tokenizeUserInCookie } from "../../middleware/token.js";




export const router = Router()


router.post('/',
    loginController,
    tokenizeUserInCookie,
    (req, res) => {
      //console.log(req.user)

        res.sendStatus(201)
    })

router.delete('/current',
    tokenInCookieDelete,
    (req, res) => {
        res.sendStatus(204)
  })

/* 
  try {
    const token = await encriptar(req.user)
    res.cookie('authorization', token, cookieOpts)
    next()
  } catch (error) {
    next(error)
  }
*/

/* router.post('/',async(req,res,next)=>{
  
) */