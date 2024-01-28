/* import dotenv from 'dotenv'
import Command  from 'commmander'

const program = new Command()
program 
.option('-p, --prod','variables de entorno',false)
.parse()

const {prod}= program.opts() */

//clase 13 3.16.0

export const MONGODB_CNX_STR = "mongodb://localhost/class13"
export const PORT =8080
export const JWT_PRIVATE_KEY = "jwt"