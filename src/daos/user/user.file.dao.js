
class Product {
    #_id
    #username
    #first_name
    #last_name
    #age
    #email
    #password
    #picture
    
    constructor({
        username,
        first_name,
        last_name,
        age,
        email,
        password,
        picture,
    }){
        this._id=randomUUID()
        this.username = username 
        this.first_name = first_name 
        this.last_name = last_name 
        this.age = age 
        this.email = email 
        this.password = password 
        this.picture = picture 
    }   

    get username() {return this.username}
    get first_name() {return this.first_name}
    get last_name() {return this.last_name}
    get age() {return this.age}
    get email() {return this.email}
    get password() {return this.password}
    get picture() {return this.picture}

    set username(value){
        if(!value) throw new Error('el campo "username" no es obligatorio')
        this.username = value
    }
    set first_name(value){
        if(!value) throw new Error('el campo "first_name" no es obligatorio')
        this.first_name = value
    }
    set last_name(value){
        if(!value) throw new Error('el campo "last_name" no es obligatorio')
        this.last_name = value
    }
    set age(value){
        if(!value || value < 0) throw new Error('el campo "age" no es obligatorio')
        this.age = value
    }
    set email(value){
        if(!value) throw new Error('el campo "email" no es obligatorio')
        this.email = value
    }
    set password(value){
        if(!value) throw new Error('el campo "password" no es obligatorio')
        this.password = value
    }
    set picture(value){
        //if(!value) throw new Error('el campo "picture" no es obligatorio')
        this.picture = value
    }

    toObject(){
        return {
            _id  : this.#_id,
            username  : this.#username,
            first_name  : this.#first_name,
            last_name  : this.#last_name,
            age  : this.#age,
            email  : this.#email,
            //password  : this.#password,
            picture  : this.#picture,
        }
    }
}



class UserFileDao {

    constructor(path){
        this.path = path
    }

    async #readUser(){
        return JSON.parse(await fs.readFile(this.path,'utf-8'))
    }

    async #writeUser(message){
        await fs.writeFile(this.path, JSON.stringify(message,null,2))
    }


    async create(data){ 
        const user = new User(data)
        const users  = await this.#readUser()
        users.push(user.toObject())
        await this.#writeUser(users)
        return user.toObject()
    }
    async read(query){ 
        const users = await this.#readUser()
        const searched = users.find(p=>{
            return true
        })
    }
    async readMany(query){ 
        const users = await this.#readUser()
        return users
    }
    async update(query,data){ 
        throw new Error('update -> not implemented')
    }
    async updateMany(query,data){ 
        throw new Error('updateMany -> not implemented')
        
    }
    async delete(query){ 
        throw new Error('delete -> not implemented')
    }
    async deleteMany(query){ 
        throw new Error('deleteMany -> not implemented')
    }
}

//singelton
const userFileDao = new UserFileDao('./db/user.json')
console.log('User usando archivos json para persistencia')

export async function getDao(){
    return userFileDao 
}
