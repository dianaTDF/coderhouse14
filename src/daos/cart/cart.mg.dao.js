import {mongoose,model} from "mongoose"
import {randomUUID} from 'node:crypto'

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


class cartMongooseDao {
    async create(data){ 
        throw new Error('create -> not implemented')
    }
    async read(query){ 
        return await Cart.findOne(query).lean()
    }
    async readMany(query){ 
        return await Cart.find(query).lean()
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

export const cartMongooseDao = new cartMongooseDao()