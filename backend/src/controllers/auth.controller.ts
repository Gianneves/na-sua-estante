import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts";
import dotenv from 'dotenv';
dotenv.config();
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { error } from "console";

export const authController = {
    Login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            if (!email || !password) return res.status(400).json({ message: "Nome, email e senha são obrigatórios" })

            const currentUser = await prisma.user.findUnique({
                where:
                    { email }
            })

            if (!currentUser) return res.status(404).json({ message: 'E-mail ou senha inválidos' })

            const verify = await bcrypt.compare(password, currentUser.password)

            if (!verify) {
                return res.status(401).json({ message: 'E-mail ou senha inválidos' })
            }

            const secretKey = process.env.SECRET_KEY
            if (!secretKey) throw new Error("chave secreta está faltando")

            const token = jwt.sign({ id: currentUser.id }, secretKey, { expiresIn: 60 * 60 })

            res.status(200).json({ token })

        } catch (e) {
            res.status(500).json({ message: 'Erro no servidor' })
        }
    }
}