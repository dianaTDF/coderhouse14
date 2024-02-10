//import { productMongooseDao } from "../daos/product/product.mg.dao.js"
import { getDao } from "../daos/product/product.dao.js"


const productDao= getDao()

class Service{
    async addProducts(productData){
        const product = await productDao.create(productData)
        return product
    }

    async getProduct(searchData){
        return await productDao.read(searchData)
    }

    async getProducts(searchData){
        return await productDao.readMany(searchData)
    }

    async putProduct(searchData,productData){
        return await productDao.update(searchData,productData)
    }


    async deleteProduct(searchData){
        return await productDao.delete(searchData)
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


export const productService = new Service()