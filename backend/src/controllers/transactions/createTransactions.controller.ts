import type { Request, Response } from "express"
import prisma from "../../config/prisma.js"
import { createTransactionSchema } from "../../schemas/transaction.schemas.js"

const createTransaction = async (req: Request, res: Response): Promise<void> => {
    const userId: string | null = "FEDSADa32#@#"

    if (!userId) {
        return void res.status(401).json({ error: "Usuario nao autenticado" })
    }
    //TODO entender melhor esse trecho
    const result = createTransactionSchema.safeParse(req.body)
    
    if(!result.success) {
        const errorMessage = result.error.issues[0]?.message || 'Validação invalida'
        res.status(400).json({ error: errorMessage })
        return
    }

    const transaction = result.data

    try {
        const category = await prisma.category.findFirst({
            where: {
                id: transaction.categoryId,
                type: transaction.type
            }
        })

        if(!category) {
            res.status(400).json({ error: "Categoria invalida" })
            return
        }

        const parsedDate = new Date(transaction.date)

        const newTransation = await prisma.transaction.create({
            data: {
                ...transaction,
                userId,
                date:parsedDate
            },
            include: {
                category: true
            }
        })
        res.status(201).json(newTransation)
        
    } catch (error) {
        console.error("Erro ao criar transacao:", error)
        res.status(500).json({ error: "Erro interno do servidor" }) 
    }
}

export default createTransaction