import { cartService } from "../service/cart.service.js"

export async function getAllController(req,res,next){
    try {
        const carts= await cartService.getCarts()
        res.result(carts)
    } catch (error) {
        next(error)
    }
}

export async function getController(req,res,next){
    try {
        const carts= await cartService.getCart(req.params)
        res.result(carts)
    } catch (error) {
        next(error)
    }
}

export async function postController(req,res,next){
    try {
        const carts= await cartService.addCarts(req.body)
        res.created(carts)
    } catch (error) {
        next(error)
    }
}

export async function putController(req,res,next){
    try {
        const carts= await cartService.putCart(req.params,req.body)
        res.created(carts)
    } catch (error) {
        next(error)
    }
}

export async function deleteController(req,res,next){
    try {
        const carts= await cartService.deleteCart(req.params)
        res.created(carts)
    } catch (error) {
        next(error)
    }
}

export async function putProductController(req,res,next){
    try {
        const carts= await cartService.addProductToCart(req.params,req.body)
        res.created(carts)
    } catch (error) {
        next(error)
    }
}

export async function deleteProductController(req,res,next){
    try {
        const carts= await cartService.deleteProductFromCart(req.params)
        res.created(carts)
    } catch (error) {
        next(error)
    }
}