import { userMongooseDao } from "../daos/user/user.mg.dao.js"


class Service{

    async getUsers(){
        return await userMongooseDao.findMany({})
    }
}

export const userService= new Service()