import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import { bookRoutes } from "./routes/book.route.ts";
import { userRoutes } from "./routes/user.route.ts";

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT

app.use('/api/v1/books/', bookRoutes)
app.use('/api/v1/users/', userRoutes)

app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
})