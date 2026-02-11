import type { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import { userService } from "../services/user.service.ts";
import { User } from "../interfaces/user.interface.ts";

export const userController = {
    createUser: async (req: Request, res: Response) => {
        try {
            const { name,
                nickname,
                email,
                password,
                profile_photo } = req.body

            if (!name || !email || !password) return res.status(400).json({ message: "Nome, email e senha são obrigatórios" })

            const user: User = {
                "name": name,
                "nickname": nickname,
                "email": email,
                "password": password,
                "profile_photo": profile_photo
            }

            const create = await userService.createUser(user)

            res.status(201).json({ create })
        } catch (e: any) {
            if (e.message === "CREATE_FAILED") {
                return res.status(404).json({ message: "Erro ao cadastrar usuário" });
            }

            console.error("Erro interno:", e);
            return res.status(500).json({ message: "Erro interno!" });
        }
    },

    findUser: async (req: Request, res: Response) => {
        try {
            
            const { id } = req.params

            if (!id) return res.status(400).json({ message: "parâmetro id não encontrado" })
            
             const user = await userService.findUser(id) 

             res.status(200).json({ user })
            
        } catch (e: any) {
             if (e.message === "NOT_FOUND") {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            console.error("Erro interno:", e);
            return res.status(500).json({ message: "Erro interno!" });
        }
    },

    getUsers: async (req: Request, res: Response) => {
        try {
            const users = await userService.getUsers()

            res.status(200).json({ users })
        } catch (e: any) {
             if (e.message === "NOT_FOUND") {
                return res.status(404).json({ message: "Usuários não encontrados" });
            }

            console.error("Erro interno:", e);
            return res.status(500).json({ message: "Erro interno!" });
        }
    },

}