import { connect as mongooseConnection} from "mongoose"
import { MONGODB_CNX_STR, ONLINE_MODE } from "../config/config.js";

export async function connect(){
    if(ONLINE_MODE == 'online'){
        console.log('Usando a mongoDb para persistencia')
        await mongooseConnection(MONGODB_CNX_STR)
    
    
    }else{
         console.log('Usando archivos json para persistencia')
    
    }
        
}



