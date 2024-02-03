import { productService } from "../service/product.service.js"


export async function getAllController(req,res,next){
    try {
        const products= await productService.getProducts()
        res.result(products) 
    } catch (error) {
        next(error)        
    }
}

export async function getController(req,res,next){
    try {
        const products= await productService.getProduct(req.params)
        res.result(products) 
    } catch (error) {
        next(error)        
    }
}

export async function postController(req,res,next){
    try {
        const products= await productService.addProducts(req.body)
        res.created(products) 
            
    } catch (error) {
        next(error)        
    }
}

export async function putController(req,res,next){
    try {
        console.log(req.body)
        console.log(req.params)
        const products= await productService.putProduct(req.params,req.body)
        res.created(products) 
            
    } catch (error) {
        next(error)        
    }
}

export async function deleteController(req,res,next){
    try {
        const products= await productService.deleteProduct(req.params)
        res.created(products) 
            
    } catch (error) {
        next(error)        
    }
}

