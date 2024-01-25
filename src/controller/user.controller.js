import { userService } from "../service/user.service.js"

export async function getController(req,res){
    try {
        const users= await userService.getUsers()
        res.result(users)
    } catch (error) {
        next(error)
    }
}