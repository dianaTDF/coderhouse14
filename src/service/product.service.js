//import { productMongooseDao } from "../daos/product/product.mg.dao.js"
/* import { getDao } from "../daos/product/product.dao.js"


const productDao= getDao() */

export class Service{
    constructor (dao){
        this.dao= dao
    }

    async addProducts(productData){
        const product = await this.dao.create(productData)
        return product
    }

    async getProduct(searchData){
        return await this.dao.read(searchData)
    }

    async getProducts(searchData){
        return await this.dao.readMany(searchData)
    }

    async putProduct(searchData,productData){
        return await this.dao.update(searchData,productData)
    }


    async deleteProduct(searchData){
        return await this.dao.delete(searchData)
    }
/*     async putProducts(productData){
    return await productMongooseDao.updateMany(productData)
}
*/
/* 
    async deleteProducts(){
        return await productMongooseDao.deleteMany({})
    } */

}


//export const productService = new Service()