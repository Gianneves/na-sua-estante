import dotenv from 'dotenv'
dotenv.config()
import { prisma } from "../lib/prisma.ts";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const authService = {

    Login: async (email: string, password: string) => {

        const currentUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!currentUser) {
            throw new Error("NOT_FOUND")
        }

        const verify = await bcrypt.compare(password, currentUser.password)

        if (!verify) {
            throw new Error("EMAIL_PASSWORD_FAILED")
        }

        const secretKey = process.env.SECRET_KEY

        if (!secretKey) {
            throw new Error("MISSING_KEY")
        }

        const token = jwt.sign({ id: currentUser.id }, secretKey, { expiresIn: 60 * 60 })

        return token

    }
}