/* import { ONLINE_MODE } from "../../config/config.js";

let daoPath= ONLINE_MODE=="online"?"./cart.mg.dao.js":"./cart.file.dao.js" 

export const {getDao}= await import(daoPath)
 */
import {  ONLINE_MODE } from "../../config/config.js";

import { CartMongooseDao } from "./cart.mg.dao.js";
import { CartFileDao } from "./cart.file.dao.js";

const CART_ROUTE_JS='./db/cart.json'

let cartDao

if(ONLINE_MODE == 'online'){
    //console.log('Cart: conectado a mongoDb')

    if(!cartDao){
        cartDao = new CartMongooseDao()        
    }
}else{
    cartDao = new CartFileDao(CART_ROUTE_JS)
    //console.log('Cart: usando archivos json para persistencia')

}


export function getDao(){
    return cartDao
}

