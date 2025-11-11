import { Router } from "express";
import { userController } from "../controllers/user.controller.ts";

export const userRoutes = Router()

userRoutes.post('/', userController.createUser)
userRoutes.get('/', userController.getUsers)