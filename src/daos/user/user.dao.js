/* import { ONLINE_MODE } from "../../config/config.js"

let daoPath= ONLINE_MODE=="online"?"./user.mg.dao.js":"./user.file.dao.js" 

export const {getDao}= await import(daoPath)
 */

import { ONLINE_MODE } from "../../config/config.js";
import { connect} from "mongoose"

import { UserMongooseDao } from "./user.mg.dao.js";
import { UserFileDao } from "./user.file.dao.js";

const USER_ROUTE_JS='./db/user.json'

let userDao

if(ONLINE_MODE == 'online'){
    //console.log('User: conectado a mongoDb')

    if(!userDao){
        userDao = new UserMongooseDao()        
    }
}else{
    userDao = new UserFileDao(USER_ROUTE_JS)
    //console.log('User: usando archivos json para persistencia')

}


export function getDao(){
    return userDao

}