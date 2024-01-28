import { hashSync, compareSync, genSaltSync, compare } from "bcrypt";
import jwt from "jsonwebtoken"
import { JWT_PRIVATE_KEY } from "../config/config.js";

export function hash(phrase){
    if (!phrase) throw new Error(`cannont hash invalid parameter: ${phrase}`)
    return hashSync(phrase, genSaltSync(10))
}

export function sameHash(recibed, inMemory){
    if(!recibed) throw new Error(`cannont hash invalid parameter: ${recibed}`)
    return compareSync(recibed,inMemory)
}

export function encrypt(data){
    return new Promise((resolve,reject)=>{
        if(!data){
            return reject(new Error(`nothing to jwt encode!`))
        }
        jwt.sign(data,JWT_PRIVATE_KEY,{expiresIn:`24h`},(err,encoded)=>{
            if(err){
                const typedError= new Error(err.message)
                typedError['type']= 'INTERNAL_ERROR'
                reject(err)
            }else{
                resolve(encoded)
            }
        })
    })
}

export function decript(token){
    return new Promise((resolve,reject)=>{
        if(!token){
            return reject(new Error(`no token to decode!`))
        }
        jwt.ferify(token,JWT_PRIVATE_KEY,(err,decoded)=>{
            if(err){
                reject(err)
            }else{
                resolve(decoded)
            }
        })
    })
}