import {randomUUID} from 'node:crypto'
import fs from 'fs/promises'

class Product {
    #_id
    #title
    #description
    #code
    #price
    #status
    #stock
    #category
    #thumbnails

    constructor({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    }){
        this._id=randomUUID()
        this.title = title 
        this.description = description 
        this.code = code 
        this.price = price 
        this.status = status 
        this.stock = stock 
        this.category = category 
        this.thumbnails = thumbnails 
    }   

    get title() {return this.title}
    get description() {return this.description}
    get code() {return this.code}
    get price() {return this.price}
    get status() {return this.status}
    get stock() {return this.stock}
    get category() {return this.category}
    get thumbnails() {return this.thumbnails}

    set title(value){
        if(!value) throw new Error('el campo "title" no es obligatorio')
        this.title = value
    }
    set description(value){
        //if(!value) throw new Error('el campo "description" no es obligatorio')
        this.description = value
    }
    set code(value){
        if(!value) throw new Error('el campo "code" no es obligatorio')
        this.code = value
    }
    set price(value){
        if(!value || value < 0) throw new Error('el campo "price" debe ser numerico positivo')
        this.price = value
    }
    set status(value){
        //if() throw new Error('el campo "status" no es correcto')
        this.status = value
        
    }
    set stock(value){
        if(!value || value < 0) throw new Error('el campo "stock" es obligatorio y numerico positivo')
        this.stock = value
    }
    set category(value){
        //if() throw new Error('el campo "category" no es correcto')
        this.category = value
    }
    set thumbnails(value){
        //if() throw new Error('el campo "thumbnails" no es correcto')
        this.thumbnails = value
    }


    toObject(){
        return {
            _id : this.#_id,
            title : this.#title,
            description : this.#description,
            code : this.#code,
            price : this.#price,
            status : this.#status,
            stock : this.#stock,
            category : this.#category,
            thumbnails : this.#thumbnails,
        }
    }
}



export class ProductFileDao {

    constructor(path){
        this.path = path
    }

    async #readProduct(){
        return JSON.parse(await fs.readFile(this.path,'utf-8'))
    }

    async #writeProduct(message){
        await fs.writeFile(this.path, JSON.stringify(message,null,2))
    }


    async create(data){ 
        const product = new Product(data)
        const products  = await this.#readProduct()
        products.push(product.toObject())
        await this.#writeProduct(products)
        return product.toObject()
    }
    async read(query){ 
        const products = await this.#readProduct()
        const searched = products.find(p=>{
            return true
        })
    }
    async readMany(query){ 
        const products = await this.#readProduct()
        return products
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
/* const productFileDao = new ProductFileDao('./db/product.json')
console.log('Product usando archivos json para persistencia')

export async function getDao(){
    return productFileDao 
}
 */