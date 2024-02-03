import {mongoose,model, connect} from "mongoose"
import {randomUUID} from 'node:crypto'
import { MONGODB_CNX_STR } from "../../config/config.js";
//import mongoosePaginate from 'mongoose-paginate-v2'


const collection = "products"
//Schema.plugin(mongoosePaginate)

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

const Product = model(collection,schema)


class ProductMongooseDao {
    async create(data){ 
        const product = await Product.create(data)
        return product.toObject()
    }
    async read(query){ 
        return await Product.findOne(query).lean()
    }
    async readMany(query){ 
        return await Product.find(query).lean()
    }
    async update(query,data){ 
        return await Product.updateOne(query,data).lean()
        //throw new Error('update -> not implemented')
    }
    async updateMany(query,data){ 
        return await Product.updateMany(query,data).lean()
        //throw new Error('updateMany -> not implemented')
        
    }
    async delete(query){ 
        return await Product.deleteOne(query)
        //throw new Error('delete -> not implemented')
    }
    async deleteMany(query){ 
        return await Product.deleteMany(query)
        //throw new Error('deleteMany -> not implemented')
    }
}


await connect(MONGODB_CNX_STR)
console.log('Product conectado a mongoDb')
export const productMongooseDao = new ProductMongooseDao()


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