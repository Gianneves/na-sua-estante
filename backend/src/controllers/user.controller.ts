import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts";
import dotenv from 'dotenv';
dotenv.config();
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userService } from "../services/user.service.ts";
import { User } from "../interfaces/user.interface.ts";
import { createSecureServer } from "http2";


export const userController = {

    getOneUser: async (req: Request, res: Response) => {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    nickname: true,
                    email: true,
                }
            })

            if (!users) return res.status(404).json({ message: "Usuários não encontrados" })

            res.status(200).json({ users })
        } catch (e) {
            res.status(500).json({ message: "error" })
        }
    },

    getUsers: async (req: Request, res: Response) => {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    nickname: true,
                    email: true,
                }
            })

            if (!users) return res.status(404).json({ message: "Usuários não encontrados" })

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

            const user: User = {
                'name': name,
                'nickname': nickname,
                'email': email,
                'password': password,
                'profile_photo': profile_photo
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
    }
}