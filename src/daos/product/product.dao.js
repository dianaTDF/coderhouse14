/* import { ONLINE_MODE } from "../../config/config.js";

let daoPath= ONLINE_MODE=="online"?"./product.mg.dao.js":"./product.file.dao.js" 

export const {getDao}= await import(daoPath)
 */
import { ONLINE_MODE } from "../../config/config.js";

import { ProductMongooseDao } from "./product.mg.dao.js";
import { ProductFileDao } from "./product.file.dao.js";

const PRODUCT_ROUTE_JS='./db/product.json'

let productDao

if(ONLINE_MODE == 'online'){

    if(!productDao){
        //console.log('Product: conectado a mongoDb')
        productDao = new ProductMongooseDao()        
    }
}else{
    productDao = new ProductFileDao(PRODUCT_ROUTE_JS)
    //console.log('Product: usando archivos json para persistencia')

}





export function getDao(){
    return productDao

}