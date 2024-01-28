import { userMongooseDao } from "../daos/user/user.mg.dao.js"


class Service{

    async addUser(userData){
        const product = await userMongooseDao.create(userData)
        return product
    }

    async getUser(searchData){
        return await userMongooseDao.read(searchData)
    }

    async getUsers(searchData){
        return await userMongooseDao.readMany(searchData)
    }

    async putUser(searchData,userData){
        return await userMongooseDao.update(searchData,userData)
    }


    async deleteUser(searchData){
        return await userMongooseDao.delete(searchData)
    }
    
}



export const userService= new Service()




