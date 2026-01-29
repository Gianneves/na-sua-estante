import type { Response, Request } from "express"
import { createAgent, DynamicTool, HumanMessage, initChatModel, Tool, tool } from "langchain"
import { ChatOpenAI } from "@langchain/openai"
import dotenv from 'dotenv'
import z from "zod"
dotenv.config()
import axios from 'axios';

async function fetchBookPrices() {
    const response = await axios.get('http://localhost:3000/api/v1/books');
    return JSON.stringify(response.data);
}

async function fetchCategories() {
    const response = await axios.get(`http://localhost:3000/api/v1/books/categories`)
    return JSON.stringify(response.data)
}

export const aiInteractionController = {
    getChatResponse: async (req: Request, res: Response) => {
        try {

            const { context } = req.body

            const apiKey = process.env.OPEN_AI_KEY

            if (!apiKey) return res.status(500).json({ message: "Chave da api está faltando" })

            const priceTool = new DynamicTool({
                name: "get_book_prices",
                description: "Obter preços dos livros",
                func: fetchBookPrices
            })

            const categoryTool = new DynamicTool({
                name: "get_book_category",
                description: "Útil para listar livros de uma categoria específica. A entrada deve ser apenas o nome da categoria (ex: 'music', 'science').",
                func: fetchCategories
            });

            const tools = [priceTool, categoryTool]

            const model = new ChatOpenAI({
                model: "gpt-4.1-nano-2025-04-14",
                apiKey: apiKey
            })

            const agent = createAgent({
                model: model,
                tools
            })

            const result = await agent.invoke({
                messages: [new HumanMessage(context)]
            });

            const finalMessage = result.messages[result.messages.length - 1];

            res.status(200).json({
                response: finalMessage.content
            });
        } catch (e) {
            console.error(e)
            res.status(500).json({ message: "Erro interno no servidor" })
        }
    }
}