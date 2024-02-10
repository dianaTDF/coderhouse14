import {randomUUID} from 'node:crypto'
import fs from 'fs/promises'

class Cart {
    #_id

    constructor({
        products,
    }){
        this._id=randomUUID()
        if (products){
            //logica para tomar prdoductos
        }
    }   


    toObject(){
        return {
            _id : this.#_id,
        }
    }
}



class CartFileDao {

    constructor(path){
        this.path = path
    }

    async #readCart(){
        return JSON.parse(await fs.readFile(this.path,'utf-8'))
    }

    async #writeCart(message){
        await fs.writeFile(this.path, JSON.stringify(message,null,2))
    }


    async create(data){ 
        throw new Error('create -> not implemented')
    }
    async read(query){ 
        throw new Error('read -> not implemented')
    }
    async readMany(query){ 
        throw new Error('readMany -> not implemented')
    }
    async update(query,data){ 
        throw new Error('update -> not implemented')
    }
    async updateMany(query,data){ 
        throw new Error('updateMany -> not implemented')
        
    }
    async delete(query){ 
        throw new Error('delete -> not implemented')
    }
    async deleteMany(query){ 
        throw new Error('deleteMany -> not implemented')
    }
}

//singelton
const cartFileDao = new CartFileDao('./db/product.json')
console.log('Product usando archivos json para persistencia')

export async function getDao(){
    return cartFileDao 
}
