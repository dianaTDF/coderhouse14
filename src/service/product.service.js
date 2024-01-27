import { productMongooseDao } from "../daos/product/product.mg.dao.js"

class Service{

    async getProducts(){
        return await productMongooseDao.readMany({})
    }

    async addProducts(productData){
        const product = await productMongooseDao.create(productData)
        return product
    }
}


export const productService = new Service()