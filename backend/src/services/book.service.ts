import { prisma } from "../lib/prisma.ts";

export const bookService = {
    getAllBooks: async () => {
        const books = await prisma.book.findMany({})

        if (!books || books.length === 0) {
            throw new Error("NOT_FOUND")
        }

        return books
    },

    getAllCategoriers: async () => {
        const category = await prisma.book.findMany({
            select: {
                category: true
            }
        })


        if (!category || category.length === 0) {
            throw new Error("NOT_FOUND")
        }

        return category
    },

    getBooksByCategory: async (category: string) => {

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

        if (!books || books.length === 0) {
            throw new Error("NOT_FOUND")
        }


    },

    getAllPrices: async () => {
        const prices = await prisma.book.findMany({
            select: {
                price: true
            }
        })

        if (!prices || prices.length === 0) {
            throw new Error("NOT_FOUND")
        }

        return prices
    }
}
