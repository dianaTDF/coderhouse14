import { Schema, model } from "mongoose";

import mongoose from "mongoose";
import {randomUUID} from 'node:crypto'
import { encrypt } from "../utils/cripyograpy.js";

const collection ="User"
const schema = new mongoose.Schema({
    _id:{type:String, default:randomUUID},
    username:{type:String,required:true},
    first_name:{type:String,required:true},
    first_name:{type:String,required:true},
    age:{type:Number,required:true},
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
                return user.toObject()                    
            } catch (error) {
                const theError= new Error(error.message)
                theError['type']='INVALID_ARGUMENT'
                throw theError
            }
        },
        authenticate: async function(username, password){
            const user = await User.findOne({username})
            if (!user && !sameHash(password, user.password)) {
                const typedError =  new Error('authentication error')      
                typedError['type']= 'FAILED_AUTHENTICATION'
                throw typedError
            }
/*             if(!sameHash(password, user.password)){
                const typedError =  new Error('authentication error')      
                typedError['type']= 'FAILED_AUTHENTICATION'
                throw typedError
            }
 */            
            return user.toObject()
        }
    }
})

const User = model(collection,schema)


class userMongooseDao {
    async create(data){ 
        throw new Error('create -> not implemented')
    }
    async read(query){ 
        return await User.findOne(query).lean()
    }
    async readMany(query){ 
        return await User.find(query).lean()
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

export const userMongooseDao = new userongooseDao()