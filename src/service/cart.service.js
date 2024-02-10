import {getDao} from '../daos/cart/cart.dao.js' 

const cartDao= getDao()

class Service{
    async addCarts(cartData){
        const cart = await cartDao.create(cartData)
        return cart
    }

    async getCart(searchData){
        return await cartDao.read(searchData)
    } 

    async getCarts(searchData){
        return await cartDao.readMany(searchData)
    } 

    async putCart(searchData,cartData){
        return await cartDao.update(searchData,cartData)
    } 
    
    async deleteCart(searchData){
        return await cartDao.delete(searchData)
    } 

    async addProductToCart(searchData,cartData){
        return await cartDao.addProduct(searchData,cartData)
    } 
    
    async deleteProductFromCart(searchData){
        return await cartDao.deleteProduct(searchData)
    } 
}


export const cartService = new Service()