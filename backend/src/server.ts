import app from "./app.js"
import dotenv from "dotenv"
import { prismaConnect } from "./config/prisma.js"
import { initializeGlobalCategories } from "./services/globalCategories.service.js"

dotenv.config()

const port = 3333

const server = app.listen(port, async () => {
    await prismaConnect()
    await initializeGlobalCategories()
    console.log(`🚀 Servidor rodando na porta ${port}`)
})

server.on("error", (error) => {
    console.error("❌ Erro ao iniciar o servidor:", error)
})
