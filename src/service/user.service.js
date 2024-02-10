import { getDao } from "../daos/user/user.dao.js"

const userDao = getDao()

class Service{

    async addUser(userData){
        const product = await userDao.create(userData)
        return product
    }

    async getUser(searchData){
        return await userDao.read(searchData)
    }

    async getUsers(searchData){
        return await userDao.readMany(searchData)
    }

    async putUser(searchData,userData){
        return await userDao.update(searchData,userData)
    }


    async deleteUser(searchData){
        return await userDao.delete(searchData)
    }
    
}



export const userService= new Service()




