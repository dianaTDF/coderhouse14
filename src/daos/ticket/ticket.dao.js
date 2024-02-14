/* import { ONLINE_MODE } from "../../config/config.js";

let daoPath= ONLINE_MODE=="online"?"./product.mg.dao.js":"./product.file.dao.js" 

export const {getDao}= await import(daoPath)
 */
import { ONLINE_MODE } from "../../config/config.js";

import { TicketMongooseDao } from "./ticket.mg.dao.js";
import { TicketFileDao } from "./ticket.file.dao.js";

const TICKET_ROUTE_JS='./db/ticket.json'

let ticketDao

if(ONLINE_MODE == 'online'){

    if(!ticketDao){
        //console.log('Ticket: conectado a mongoDb')
        ticketDao = new TicketMongooseDao()        
    }
}else{
    ticketDao = new TicketFileDao(TICKET_ROUTE_JS)
    //console.log('Ticket: usando archivos json para persistencia')

}


export function getDao(){
    return ticketDao

}