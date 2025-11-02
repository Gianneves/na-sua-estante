// src/lib/prisma.ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { PrismaClient } from "../generated/client.ts";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não definida no runtime.");
}

export const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL },
  },
});