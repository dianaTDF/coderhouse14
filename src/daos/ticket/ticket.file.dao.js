import {randomUUID} from 'node:crypto'
import fs from 'fs/promises'

class Ticket {
    #_id
    #code
    #purchase_datetime
    #amount
    #purchaser

    constructor({
        code,
        purchase_datetime,
        amount,
        purchaser,
    }){
        this._id=randomUUID()
        this.code = code 
        this.purchase_datetime = purchase_datetime 
        this.amount = amount 
        this.purchaser = purchaser 
    }   

    /* 
Id (autogenerado por mongo)
- code: String debe autogenerarse y ser único
- purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
- amount: Number, total de la compra.
- purchaser: String, contendrá el correo del usuario asociado al carrito.
*/

    get code() {return this.code}
    get purchase_datetime() {return this.purchase_datetime}
    get amount() {return this.amount}
    get purchaser() {return this.purchaser}

    set purchase_datetime(value){
        if(!value) throw new Error('el campo "title" es obligatorio')
        this.purchase_datetime = value
    }
    set purchaser(value){
        if(!value) throw new Error('el campo "purchaser" es obligatorio')
        this.purchaser = value
    }
    set code(value){
        if(!value) throw new Error('el campo "code" es obligatorio')
        this.code = value
    }
    set amount(value){
        if(!value || value < 0) throw new Error('el campo "amount" debe ser numerico positivo')
        this.amount = value
    }

    toObject(){
        return {
            _id : this.#_id,
            code : this.#code,
            purchase_datetime : this.#purchase_datetime,
            amount : this.#amount,
            purchaser : this.#purchaser
        }
    }
}



export class TicketFileDao {

    constructor(path){
        this.path = path
    }

    async #readTicket(){
        return JSON.parse(await fs.readFile(this.path,'utf-8'))
    }

    async #writeTicket(message){
        await fs.writeFile(this.path, JSON.stringify(message,null,2))
    }


    async create(data){ 
        const ticket = new Ticket(data)
        const tickets  = await this.#readTicket()
        tickets.push(ticket.toObject())
        await this.#writeTicket(tickets)
        return ticket.toObject()
    }
    async read(query){ 
        const tickets = await this.#readTicket()
        const searched = tickets.find(p=>{
            return true
        })
    }
    async readMany(query){ 
        const tickets = await this.#readTicket()
        return tickets
    }
    async update(query,data){ 
        throw new Error('update -> not implemented')
    }
    async updateMany(query,data){ 
        throw new Error('updateMany -> not implemented')
        
    }
    async delete(query){ 
        throw new Error('delete -> not implemented')
    }
    async deleteMany(query){ 
        throw new Error('deleteMany -> not implemented')
    }
}

//singelton
/* const productFileDao = new ProductFileDao('./db/product.json')
console.log('Product usando archivos json para persistencia')

export async function getDao(){
    return productFileDao 
}
 */