/* import {getDao} from '../daos/cart/cart.dao.js' 

const cartDao= getDao() */

export class Service{
    constructor (dao, productService){
        this.dao= dao
        this.productService= productService
    }

    async addCarts(cartData){
        const cart = await this.dao.create(cartData)
        return cart
    }

    async getCart(searchData){
        return await this.dao.read(searchData)
    } 

    async getCarts(searchData){
        return await this.dao.readMany(searchData)
    } 

    async putCart(searchData,cartData){
        return await this.dao.update(searchData,cartData)
    } 
    
    async deleteCart(searchData){
        return await this.dao.delete(searchData)
    } 



    async addProductsToCart(searchData,cartData){
        const tienda = await this.dao.read(searchData)
        if (!tienda) {
          throw new Error('Cart incorrecto')
        }
            //return cartData[1]['productId']
        let index = 0
        let productsExist=true
        
        if (cartData.length ==0){throw new Error('Lista de productos esta vacia')}


        do {
            productsExist =await this.productService.getProduct({_id:cartData[index]['_pid']}) != null
            index ++

        } while (index < cartData.length && productsExist )
        if (!productsExist){throw new Error('Lista de productos tiene datos erroneos')}


        return await this.dao.addProducts(searchData,cartData)
        return cartData
        
    }

    async addProductToCart(searchData,cartData){
        return await this.dao.addProduct(searchData,cartData)
    } 
    
    async deleteProductFromCart(searchData){
        return await this.dao.deleteProduct(searchData)
    } 
}


// export const cartService = new Service()

/* 
CART que necesita
crearse,
recibir productos
eliminar productos
*/

export class TiendasService {
    constructor(tiendasDao, juguetesService) {
      this.tiendasDao = tiendasDao
      this.juguetesService = juguetesService
    }
  
    async registrar(datosTienda) {
      const tiendaPojo = await this.tiendasDao.create(datosTienda)
      return tiendaPojo
    }
  
    async agregarJuguete(idTienda, idJuguete) {
  
      const tienda = await this.tiendasDao.readOne({ _id: idTienda })
      if (!tienda) {
        throw new Error('la tienda no existe')
      }
  
      const juguete = await this.juguetesService.readOne({ _id: idJuguete })
      if (!juguete) {
        throw new Error('el juguete no existe')
      }
  
      tienda.juguetes.push(idJuguete)
  
      await this.tiendasDao.updateOne({ _id: idTienda }, tienda)
    }
  }