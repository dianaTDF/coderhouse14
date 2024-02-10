import { ONLINE_MODE } from "../../config/config.js"

let daoPath= ONLINE_MODE=="online"?"./user.mg.dao.js":"./user.file.dao.js" 

export const {getDao}= await import(daoPath)
