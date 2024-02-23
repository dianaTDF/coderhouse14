import {Schema , model } from "mongoose";

import {randomUUID} from 'node:crypto'
import { encrypt, hash, sameHash } from "../../utils/cripyograpy.js";
//import { MONGODB_CNX_STR } from "../../config/config.js";
import { toPojo } from "../../utils/toPOJO.js";

const collection ="User"
const schema = new Schema({
    _id:{type:String, default:randomUUID},
    username:{type:String,required:true},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    age:{type:Number,required:true},
    rol:{
        type: String,
        enum: ['admin', 'user','tecnic','seller']
      },
    cart_id:{type:String,
            ref:'carts'
    },
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    picture:{type:String,default:''},
    //cart:{type:String,required:true},
    //role:{type:String,required:true}
},
{
    versionKey:false,
    strict:'throw',
    statics: {
        register: async function(userData){
            try {
                if(userData.password){
                    userData.password= await hash(userData.password)
                }
                const user= await this.create(userData)
                return toPojo(user)
                //return user                    
            } catch (error) {
                const theError= new Error(error.message)
                theError['type']='INVALID_ARGUMENT'
                throw theError
            }
        },
        authenticate: async function(query){
            let {username, password}= query
            const user = await User.findOne({username})
            if (!user) {
                const typedError =  new Error('authentication error')      
                typedError['type']= 'FAILED_AUTHENTICATION'
                throw typedError
            }
            if (!sameHash(password, user.password)) {
                const typedError =  new Error('authentication error')      
                typedError['type']= 'FAILED_AUTHENTICATION'
                throw typedError
            }        
            return toPojo(user)
        }
    }
})

schema.pre(['find', 'findOne', 'findById'],function(next){
    this.populate('carts.cart')
    next()
})



const User = model(collection,schema)


export class UserMongooseDao {
    async create(data){ 
        const user = await User.create(data)
        return toPojo(user) 
        //throw new Error('create -> not implemented')
    }
    async create(data){ 
        let list =[]
        if(Array.isArray(data)){
            for (const item of data) {
                //console.log(data.email)
                let user = await User.register(item)
                list.push(toPojo(user)) 
            }    
            return list 
        }else{
            let user = await User.register(data)
            return toPojo(user) 
        }
        //throw new Error('create -> not implemented')
    }
    async read(query){ 
        const user = await User.findOne(query).lean()
        return toPojo(user)
    }
    async readMany(query){ 
        const users = await User.find(query).lean()
        return toPojo(users)

    }
    async update(query,data){ 
        const user = await User.updateOne(query,data).lean()
        return toPojo(user)
        //throw new Error('update -> not implemented')
    }
    async updateMany(query,data){ 
        const users = await User.updateMany(query,data).lean()
        return toPojo(users)
        //throw new Error('updateMany -> not implemented')
    }
    async delete(query){ 
        return await User.deleteOne(query)

        //throw new Error('delete -> not implemented')
    }
    async deleteMany(query){ 
        return await User.deleteMany()
        //throw new Error('deleteMany -> not implemented')
    }
    
    
    async authenticate(query){ 
        return await User.authenticate(query)
        //throw new Error('deleteMany -> not implemented')
    }
}


/* let userMongooseDao
export async function getDao(){
    if(!userMongooseDao){
        await connect(MONGODB_CNX_STR)
        console.log('User conectado a mongodb')
        userMongooseDao = new UserMongooseDao()
    }
    return userMongooseDao
} */
/* 
await connect(MONGODB_CNX_STR)
console.log('User conectado a mongodb')
export const userMongooseDao = new UserMongooseDao() */
