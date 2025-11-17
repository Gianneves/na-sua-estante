import { Router } from "express"
import { aiInteractionController } from "../controllers/aiInteraction.controller.ts"

export const aiRoutes = Router()

aiRoutes.get('/', aiInteractionController.getChatResponse)