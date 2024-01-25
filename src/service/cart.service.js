import cartMongooseDao from '../daos/cart/cart.mg.dao.js'

class Service{
    async getCarts(){
        return await cartMongooseDao.getCarts()
    } 
}

export const cartService = new Service()