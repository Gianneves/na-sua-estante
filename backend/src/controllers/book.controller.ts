import type { Request, Response } from "express";
import { bookService } from "../services/book.service.ts";

export const bookController = {
    getBooks: async (req: Request, res: Response) => {
        try {
            const books = await bookService.getAllBooks()

            return res.status(200).json({ success: true, books })

        } catch (e: any) {
            if (e.message === "NOT_FOUND") {
                return res.status(404).json({ message: "Livros não encontrados" });
            }

            console.error("Erro interno:", e);
            return res.status(500).json({ message: "Erro interno!" });
        }
    },

    getAllCategoriers: async (req: Request, res: Response) => {
        try {
            const categories = await bookService.getAllCategoriers()

            return res.status(200).json({ success: true, categories })
        } catch (e: any) {
            if (e.message === "NOT_FOUND") {
                return res.status(404).json({ message: "Preços não encontrados" });
            }

            console.error("Erro interno:", e);
            return res.status(500).json({ message: "Erro interno!" });
        }
    },

    getBooksByCategory: async (req: Request, res: Response) => {
        try {
            const { category } = req.params

            if (!category) return res.status(400).json({ message: "Por favor, diga a categoria" })

            const books = await bookService.getBooksByCategory(category)

            return books
        } catch (e: any) {
            if (e.message === "NOT_FOUND") {
                return res.status(404).json({ message: "Categoria não encontrada" });
            }

            console.error("Erro interno:", e);
            return res.status(500).json({ message: "Erro interno!" });
        }
    },

    getAllPrices: async (req: Request, res: Response) => {
        try {
            const prices = await bookService.getAllPrices()

            return res.status(200).json({ success: true, prices })

        } catch (e: any) {
            if (e.message === "NOT_FOUND") {
                return res.status(404).json({ message: "Preços não encontrados" });
            }

            console.error("Erro interno:", e);
            return res.status(500).json({ message: "Erro interno!" });
        }
    }
}

