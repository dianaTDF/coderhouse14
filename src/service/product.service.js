import { productMongooseDao } from "../daos/product/product.mg.dao.js"

class Service{

    async addProducts(productData){
        const product = await productMongooseDao.create(productData)
        return product
    }

    async getProduct(searchData){
        return await productMongooseDao.read(searchData)
    }

    async getProducts(searchData){
        return await productMongooseDao.readMany(searchData)
    }

    async putProduct(searchData,productData){
        return await productMongooseDao.update(searchData,productData)
    }

/*     async putProducts(productData){
        return await productMongooseDao.updateMany(productData)
    }
 */
    async deleteProduct(searchData){
        return await productMongooseDao.delete(searchData)
    }
/* 
    async deleteProducts(){
        return await productMongooseDao.deleteMany({})
    } */

}


export const productService = new Service()