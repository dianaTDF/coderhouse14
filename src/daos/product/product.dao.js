import { ONLINE_MODE } from "../../config/config.js";

let daoPath= ONLINE_MODE=="online"?"./product.mg.dao.js":"./product.file.dao.js" 

export const {getDao}= await import(daoPath)
