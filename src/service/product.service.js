import { productMongooseDao } from "../daos/product/product.mg.dao.js"

class Service{

    async getProducts(){
        return await productMongooseDao.readMany({})
    }
}


export const productService = new Service()