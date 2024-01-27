import {mongoose,model} from "mongoose"
import {randomUUID} from 'node:crypto'
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = "products"

const schema = new mongoose.Schema({
    _id:{type:String, default:randomUUID},
    title:{type:String,required:true, index:true},
    description:{type:String,required:true},
    code:{type:String,required:true},
    price:{type:Number,required:true},
    status:{type:String,required:true},
    stock:{type:Number,required:true},
    category:{type:String,required:true},
    thumbnails:{type:[String], default:[]},
},{
    strict: 'throw',
    versionKey: false
})

schema.plugin(mongoosePaginate)
const Product = model(collection,schema)


class productMongooseDao {
    async create(data){ 
        const product = Product.create(data).toObject()
        return product
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

export const productMongooseDao = new productMongooseDao()


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