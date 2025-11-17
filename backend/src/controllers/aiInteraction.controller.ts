import type { Response, Request } from "express"
import { createAgent, initChatModel, Tool, tool } from "langchain"
import { ChatOpenAI } from "@langchain/openai"
import dotenv from 'dotenv'
import z from "zod"
dotenv.config()

export const aiInteractionController = {
    getChatResponse: async (req: Request, res: Response) => {
        try {

            const { context } = req.body

            const apiKey = process.env.OPEN_AI_KEY

            if (!apiKey) return res.status(500).json({ message: "Chave da api está faltando" })

            //const searchCategory = tool()

            const model = new ChatOpenAI({
                model: "gpt-4.1-nano-2025-04-14",
                apiKey: apiKey
            })

            const agent = createAgent({
                model: model,
             
            })

            const response = await agent.invoke(context)

            res.status(200).json({ response })
        } catch (e) {
            console.error(e)
            res.status(500).json({ message: "Erro interno no servidor" })
        }
    }
}