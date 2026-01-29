import { Router } from "express";
import { bookController } from "../controllers/book.controller.ts";

export const bookRoutes = Router()

bookRoutes.get('/', bookController.getBooks)
bookRoutes.get('/prices', bookController.getAllPrices)
bookRoutes.get('/categories/:category', bookController.getBooksByCategory)
bookRoutes.get('/categories', bookController.getAllCategoriers)