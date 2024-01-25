import { Router } from "express";

export const router = Router()

router.get('/',(req,res)=>{
    res.sendFile('main.html',{root: './views'})
})