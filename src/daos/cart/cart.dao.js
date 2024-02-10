import { ONLINE_MODE } from "../../config/config.js";

let daoPath= ONLINE_MODE=="online"?"./cart.mg.dao.js":"./cart.file.dao.js" 

export const {getDao}= await import(daoPath)
