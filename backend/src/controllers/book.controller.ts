import type { Request, Response } from "express";

import { prisma } from "../lib/prisma.ts";

export const bookController = {
    getBooks: async (req: Request, res: Response) => {
        try {
            const books = await prisma.book.findMany({})

            if (!books) return res.status(404).json({ message: "Nenhum livro encontrado" })

            return res.status(200).json({ success: true, books })

        } catch (error) {
            console.error("Erro interno")
            res.status(500).json({ message: "Erro interno!" })
        }
    },

    getBooksByCategory: async (req: Request, res: Response) => {
        try {
            const { category } = req.params
            if (!category) return res.status(404).json({ message: "Categoria não encontrada" })

            const books = await prisma.book.findMany({
                select: { 
                    id: true,
                    title: true,
                    description: true
                },
                where: {
                    category: category
                }
            })

            res.status(200).json({ books })

        } catch (e) {
            console.error("Erro interno")
            res.status(500).json({ message: "Erro interno!" })
        }
    }
}