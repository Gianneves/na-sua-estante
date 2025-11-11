import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts";
import dotenv from 'dotenv';
dotenv.config();
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userController = {

    getUsers: async (req: Request, res: Response) => {
        try {
            const users = await prisma.user.findMany({})

            if(!users) return res.status(404).json({ message: "Usuários não encontrados" })

            res.status(200).json({ users })
        } catch (e) {
            res.status(500).json({ message: "error" })
        }
    },


    createUser: async (req: Request, res: Response) => {
        try {
            const { name,
                nickname,
                email,
                password,
                profile_photo } = req.body

            if (!name || !email || !password) return res.status(400).json({ message: "Nome, email e senha são obrigatórios" })

            const salt = 10
            const secretKey: string | undefined = process.env.SECRET_KEY 
            if (!secretKey) throw new Error('SECRET_KEY not set')

            const hasPass = await bcrypt.hash(password, salt)

            const user = await prisma.user.create({
                data: {
                    name,
                    nickname,
                    email,
                    password: hasPass,
                    profile_photo
                }
            })

            const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 60 * 60 })

            res.status(201).json({ user, token })
        } catch (e) {
            console.log(e)
            res.status(500).json()
        }
    }
}