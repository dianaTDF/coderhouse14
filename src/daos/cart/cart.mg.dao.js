import {mongoose,model, connect} from "mongoose"
import {randomUUID} from 'node:crypto'
import { MONGODB_CNX_STR } from "../../config/config.js"

const collection = "carts"

const schema = new mongoose.Schema({
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


class CartMongooseDao {
    async create(data){ 
        const cart = await Cart.create(data)
        return cart.toObject()
        //throw new Error('create -> not implemented')
    }
    async read(query){ 
        return await Cart.findOne(query).lean()
    }
    async readMany(query){ 
        return await Cart.find(query).lean()
    }
    async update(query,data){ 
        return await Cart.uodateOne(query,data).lean()
        //throw new Error('update -> not implemented')
    }
    async updateMany(query,data){ 
        return await Cart.uodateMany(query,data).lean()
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

await connect(MONGODB_CNX_STR)
console.log('Cart conectado a mongoDb')
export const cartMongooseDao = new CartMongooseDao()