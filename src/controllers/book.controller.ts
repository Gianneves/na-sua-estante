import type { Request, Response } from "express";

import { prisma } from "../lib/prisma.ts";

export const bookController = {
    getBooks: async (req: Request, res: Response) => {
        try {
            const books = await prisma.book.findMany({})

            if (!books) return res.status(404).json({ success: false, message: "Nenhum livro encontrado" })

            return res.status(200).json({ success: true, books })

        } catch (error) {
            console.error("Erro interno")
            res.status(500).json({ message: "Erro interno!" })
        }
    }
}