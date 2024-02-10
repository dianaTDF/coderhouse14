import {Schema,model} from "mongoose"
import {randomUUID} from 'node:crypto'
import { toPojo } from "../../utils/toPOJO.js";
//import mongoosePaginate from 'mongoose-paginate-v2'


const collection = "products"
//Schema.plugin(mongoosePaginate)

const schema = new Schema({
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


export class ProductMongooseDao {
    async create(data){ 
        const product = await Product.create(data)
        return toPojo(product)
        //return product.toObject()
    }
    async read(query){ 
        let product =await Product.findOne(query)
        return toPojo(product)

    }
    async readMany(query){ 
        let products= await Product.find(query)
        return toPojo(products)
    }
    async update(query,data){ 
        let product= await Product.updateOne(query,data)
        return toPojo(product)        
        //throw new Error('update -> not implemented')
    }
    async updateMany(query,data){ 
        let products= await Product.updateMany(query,data).lean()
        return toPojo(products)        
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