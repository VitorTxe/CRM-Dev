import type {Response} from "express"
import type {QueryRequest} from "../../types/http.types.js"
import { type GetTransactionSummaryQuery, getTransactionSummarySchema } from "../../schemas/transaction.schemas.js"
import prisma from "../../config/prisma.js"
import dayjs from "dayjs"
import type { CategorySummary } from "../../types/category.types.js"
import { TransactionType } from "@prisma/client"


export const getTransactionSummary = async (req:QueryRequest<GetTransactionSummaryQuery>, res:Response): Promise<void> => {
    const userId = "FEDSADa32#@#"

    if(!userId) {
        res.status(401).json({message: "Usuario não autenticado"})
        return
    }

    const validation = getTransactionSummarySchema.safeParse(req.query)
    if (!validation.success) {
        res.status(400).json({ 
            message: "Parâmetros de consulta inválidos", 
            error: validation.error.issues[0]?.message 
        })
        return
    }

    const {month, year} = validation.data
    const startDate = new Date(Date.UTC(Number(year), Number(month) - 1, 1))
    const endDate = new Date(Date.UTC(Number(year), Number(month), 0, 23, 59, 59, 999))

    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                category: true
            }
        })

        let totalExpenses = 0
        let totalIncome = 0
        const groupedExpenses = new Map<string, CategorySummary>()

        for(const transaction of transactions) {
            if(transaction.type === TransactionType.expense) {
                const existing = groupedExpenses.get(transaction.categoryId) ?? {
                    categoryId: transaction.categoryId,
                    categoryName: transaction.category.name,
                    categoryColor: transaction.category.color,
                    amount: 0,
                    percentage: 0
                }

                existing.amount += transaction.amount
                groupedExpenses.set(transaction.categoryId, existing)
                totalExpenses += transaction.amount 
            } else if(transaction.type === TransactionType.income) {
                totalIncome += transaction.amount
            }
        }

        const expesesByCategory: CategorySummary[] = Array.from(groupedExpenses.values()).map(category => {
            return {
                ...category,
                percentage: totalExpenses > 0 ? Math.round((category.amount / totalExpenses) * 100) : 0
            }
        })

        const summary = {
            totalExpenses,
            totalIncome,
            balance: totalIncome - totalExpenses,
            expesesByCategory
        }
        console.log(summary)
        res.status(200).json(summary)
    } catch (error) {
        res.status(500).json({message: "Erro ao obter resumo das transações", error})
    }
 }
    