import { User } from "../interfaces/user.interface.ts";
import { prisma } from "../lib/prisma.ts";
import dotenv from 'dotenv';
dotenv.config();
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userService = {

    createUser: async (user: User) => {

        const salt = 10
        const secretKey: string | undefined = process.env.SECRET_KEY
        if (!secretKey) throw new Error('SECRET_KEY not set')

        const { name, nickname, email, password, profile_photo } = user

        const hasPass = await bcrypt.hash(password, salt)

        const createUser = await prisma.user.create({
            data: {
                name,
                nickname: nickname ?? null,
                email,
                password: hasPass,
                profile_photo: profile_photo ?? null
            }
        })

        if (!createUser) {
            throw new Error("CREATE_FAILED")
        }

        const token = jwt.sign({ id: createUser.id }, secretKey, { expiresIn: 60 * 60 })

        return { createUser, token }
    },

    findUser: async (id: string) => {

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            throw new Error("NOT_FOUND")
        }

        return user
    },

    getUsers: async () => {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                nickname: true,
                email: true,
                profile_photo: true
            }
        })

        if (users.length === 0) {
            throw new Error("NOT_FOUND")
        }

        return users
    }
}