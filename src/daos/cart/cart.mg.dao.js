import {Schema,model} from "mongoose"
import {randomUUID} from 'node:crypto'
//import { MONGODB_CNX_STR } from "../../config/config.js"
import { toPojo } from "../../utils/toPOJO.js"

const collection = "carts"

const schema = new Schema({
    _id:{type:String, default:randomUUID},
    products:{
        type:[{
                _id: false,
                product:{type:String,
                        ref:'products'},
                counter:{type:Number,min:1}
                }],
        default:[]
        },
}, {
    strict: 'throw',
    versionKey: false
})


schema.pre(['find', 'findOne', 'findById'],function(next){
    this.populate('products.product')
    next()
})

const Cart = model(collection,schema)


export class CartMongooseDao {
    async create(data){ 
        let cart = await Cart.create(data)
        return toPojo(cart)
        //return cart.toObject()
        //throw new Error('create -> not implemented')
    }
    async read(query){ 
        let cart= await Cart.findOne(query).lean()
        return toPojo(cart)
    }
    async readMany(query){ 
        let carts= await Cart.find(query).lean()
        return toPojo(carts)
    }
    async update(query,data){ 
        let cart= await Cart.uodateOne(query,data).lean()
        return toPojo(cart)
        //throw new Error('update -> not implemented')
    }
    async updateMany(query,data){ 
        let carts= await Cart.uodateMany(query,data).lean()
        return toPojo(carts)
        //throw new Error('updateMany -> not implemented')
    }
    async delete(query){ 
        return await Cart.deleteOne(query)
        //throw new Error('delete -> not implemented')
    }
    async deleteMany(query){ 
        return await Cart.deleteMany(query)
        //throw new Error('deleteMany -> not implemented')
    }

    async addProduct(query,data){ 
        console.log(data.counter)
        let {counter} = data.counter 

        //si existe ese producto en el array
        let cart= await Cart.findOneAndUpdate({_id:query._id, 'products.product':query._pid},
        { $set:{'products.$.counter':counter} }, 
        { new: true})

        //su no existe ese producto en el array
        if(!cart){
            let cart= await Cart.findByIdAndUpdate({_id:query._id},
            { $push: { products: { product: query._pid, counter: counter} } })
        }

        return cart
    }
    
    async deleteProduct(query){ 
        return await Cart.findOneAndUpdate({_id:query._id},
            { $pull: { products: { product: query._pid } } },
            { new: true})

        //throw new Error('deleteMany -> not implemented')
    }
}

/* let cartMongooseDao
export async function getDao(){
    if(!cartMongooseDao){
        await connect(MONGODB_CNX_STR)
        console.log('Cart conectado a mongoDb')
        cartMongooseDao = new CartMongooseDao()        
    }
    return cartMongooseDao
} */
/* await connect(MONGODB_CNX_STR)
console.log('Cart conectado a mongoDb')
export const cartMongooseDao = new CartMongooseDao() */