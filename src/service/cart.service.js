import {cartMongooseDao} from '../daos/cart/cart.mg.dao.js' 

class Service{
    async addCarts(cartData){
        const cart = await cartMongooseDao.create(cartData)
        return cart
    }

    async getCart(searchData){
        return await cartMongooseDao.read(searchData)
    } 

    async getCarts(searchData){
        return await cartMongooseDao.readMany(searchData)
    } 

    async putCart(searchData,cartData){
        return await cartMongooseDao.update(searchData,cartData)
    } 
    
    async deleteCart(searchData){
        return await cartMongooseDao.delete(searchData)
    } 

    async addProductToCart(searchData,cartData){
        return await cartMongooseDao.addProduct(searchData,cartData)
    } 
    
    async deleteProductFromCart(searchData){
        return await cartMongooseDao.deleteProduct(searchData)
    } 
}


export const cartService = new Service()