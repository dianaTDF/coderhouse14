import {Schema,model} from "mongoose"
import {randomUUID} from 'node:crypto'
import { toPojo } from "../../utils/toPOJO.js";
//import mongoosePaginate from 'mongoose-paginate-v2'


const collection = "tickets"
//Schema.plugin(mongoosePaginate)

const schema = new Schema({
    _id:{type:String, default:randomUUID},
    code:{type:String,required:true},
    purchase_datetime:{type:String,required:true, index:true},
    amount:{type:Number,required:true},
    purchaser:{type:String,required:true},
    
},{
    strict: 'throw',
    versionKey: false
})


/* 
Id (autogenerado por mongo)
- code: String debe autogenerarse y ser único
- purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
- amount: Number, total de la compra.
- purchaser: String, contendrá el correo del usuario asociado al carrito.
*/

const Ticket = model(collection,schema)


export class TicketMongooseDao {
    async create(data){ 
        const ticket = await Ticket.create(data)
        return toPojo(ticket)
        //return product.toObject()
    }
    async read(query){ 
        let ticket =await Ticket.findOne(query)
        return toPojo(ticket)

    }
    async readMany(query){ 
        let tickets= await Ticket.find(query)
        return toPojo(tickets)
    }
    async update(query,data){ 
        let ticket= await Ticket.updateOne(query,data)
        return toPojo(ticket)        
        //throw new Error('update -> not implemented')
    }
    async updateMany(query,data){ 
        let tickets= await Ticket.updateMany(query,data).lean()
        return toPojo(tickets)        
        //throw new Error('updateMany -> not implemented')
        
    }
    async delete(query){ 
        return await Ticket.deleteOne(query)
        //throw new Error('delete -> not implemented')
    }
    async deleteMany(query){ 
        return await Ticket.deleteMany(query)
        //throw new Error('deleteMany -> not implemented')
    }
}


//lazycreate
/* let productMongooseDao
export async function getDao(){
    if(!productMongooseDao){
        await connect(MONGODB_CNX_STR)
        console.log('Product conectado a mongoDb')
        productMongooseDao = new ProductMongooseDao()        
    }
    return productMongooseDao
} */


/* 
class productMongooseDao {
    async create(data){ 
        throw new Error('create -> not implemented')
    }
    async read(query){ 
        return await Product.findOne(query).lean()
    }
    async readMany(query){ 
        return await Product.find(query).lean()
    }
    async update(data,query){ 
        throw new Error('update -> not implemented')
    }
    async updateMany(data,query){ 
        throw new Error('updateMany -> not implemented')
    }
    async delete(query){ 
        throw new Error('delete -> not implemented')
    }
    async deleteMany(query){ 
        throw new Error('deleteMany -> not implemented')
    }
}

*/