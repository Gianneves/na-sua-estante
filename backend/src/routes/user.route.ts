import { Router } from "express";
import { userController } from "../controllers/user.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";

export const userRoutes = Router()

userRoutes.get('/user', authMiddleware,userController.getOneUser)
userRoutes.post('/', userController.createUser)
userRoutes.get('/', userController.getUsers)