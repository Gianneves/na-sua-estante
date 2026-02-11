import type { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

import { authService } from "../services/auth.service.ts";


export const authController = {
    Login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            if (!email || !password) return res.status(400).json({ message: "Nome, email e senha são obrigatórios" })

            const currentUser = await authService.Login(email, password)

            res.status(200).json({ currentUser })

        } catch (e: any) {
            if (e.message === "NOT_FOUND") {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            if (e.message === "EMAIL_PASSWORD_FAILED") {
                return res.status(404).json({ message: "Email ou senha incorreta" });
            }

            if (e.message === "MISSING_KEY") {
                return res.status(404).json({ message: "Falha interna" });
            }

            res.status(500).json({ message: 'Erro no servidor' })
        }
    }
}