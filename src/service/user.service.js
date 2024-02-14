//import { getDao } from "../daos/user/user.dao.js"

//const userDao = getDao()

export class Service{
    constructor (dao){
        this.dao= dao
    }

    async addUser(userData){
        const product = await this.dao.create(userData)
        return product
    }

    async getUser(searchData){
        return await this.dao.read(searchData)
    }

    async getUsers(searchData){
        return await this.dao.readMany(searchData)
    }

    async putUser(searchData,userData){
        return await this.dao.update(searchData,userData)
    }


    async deleteUser(searchData){
        return await this.dao.delete(searchData)
    }
    async deleteUsers(searchData){
        return await this.dao.deleteMany(searchData)
    }
    
}



//export const userService= new Service()




