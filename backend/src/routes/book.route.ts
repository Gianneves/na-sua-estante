import { Router } from "express";
import { bookController } from "../controllers/book.controller.ts";

export const bookRoutes = Router()

bookRoutes.get('/', bookController.getBooks)