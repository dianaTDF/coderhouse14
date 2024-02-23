import { encrypt } from "../utils/cripyograpy.js";


const cookieOptions={
    httpOnly:true,
    maxAge:1000*60*60*24,
    signed:true}


export async function tokenizeUserInCookie(req,res,next){
    try {
        const token = await encrypt(req.user)
        res.cookie('auth', token,cookieOptions)
        next()
    } catch (error) {
        next(error)
    }
}

export function tokenInCookieDelete(req,res,next){
    res.clearCookie('auth', cookieOptions)
    next()
}