import { getDao as CartDao } from "../daos/cart/cart.dao.js";
import { getDao as ProductDao } from "../daos/product/product.dao.js";
import { getDao as UserDao } from "../daos/user/user.dao.js";
import { getDao as TicketDao } from "../daos/ticket/ticket.dao.js";

import { Service as UserService } from "./user.service.js"; 
import { Service as ProductService } from "./product.service.js"; 
import { Service as CartService } from "./cart.service.js"; 
import { Service as TicketService } from "./ticket.service.js"; 


export const userService= new UserService(UserDao())
export const productService= new ProductService(ProductDao())
export const ticketService= new TicketService(TicketDao())
export const cartService= new CartService(CartDao(), productService)