import { productService } from "../service/product.service.js"


export async function getController(req,res){
    try {
        const products= await productService.getProducts()
        res.result(products) 
            
    } catch (error) {
        next(error)        
    }
}