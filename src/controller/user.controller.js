import { userService } from "../service/index.js"



export async function getAllController(req,res,next){
    try {
        const users= await userService.getUsers()
        res.result(users)
    } catch (error) {
        next(error)
    }
}
export async function getController(req,res,next){
    try {
        console.log(req.params)
        const users= await userService.getUser(req.params)
        res.result(users)
    } catch (error) {
        next(error)
    }
}

export async function postController(req,res,next){
    try{
        const users = await userService.addUser(req.body)
        res.created(users)
    }catch(error){
        next(error)
    }
}

export async function putController(req,res,next){
    try{
        const users= await userService.putUser(req.params,req.body)
        res.created(users)
    }catch(error){
        next(error)
    }
}

export async function deleteController(req,res,next){
    try{
        const users= await userService.deleteUser(req.params)
        res.created(users)
    }catch(error){
        next(error)

    }
}
export async function deleteAllController(req,res,next){
    try{
        const users= await userService.deleteUsers(req.params)
        res.created(users)
    }catch(error){
        next(error)

    }
}
export async function loginController(req,res,next){ 
    try {     
        const user = await userService.authenticateUser(req.body)
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}