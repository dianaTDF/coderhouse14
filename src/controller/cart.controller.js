import { cartService } from "../service/cart.service.js"

export async function getController(req,res){
    try {
        const carts= await cartService.getCarts()
        return res.result(carts)
    } catch (error) {
        next(error)
    }
}