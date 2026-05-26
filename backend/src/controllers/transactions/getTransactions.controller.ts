//TODO estudar todo esse arquivo
import type { Response } from "express"
import prisma from "../../config/prisma.js"
import type { GetTransactionsQuery } from "../../schemas/transaction.schemas.js"
import type { QueryRequest } from "../../types/http.types.js"
import type { TransactionFilter } from "../../types/transaction.types.js"
import dayjs from "dayjs"

export const getTransactions = async (
    req: QueryRequest<GetTransactionsQuery>,
    res: Response
): Promise<void> => {
    const userId = "FEDSADa32#@#" // ID estático temporário seguindo o padrão atual do projeto

    const { month, year, type, categoryId } = req.query
        
    const filter:TransactionFilter = {userId}

    if(month && year) {
        const startDate = dayjs(`${year}-${month}-01 `).startOf("month").toDate()
        const endDate = dayjs(startDate).endOf("month").toDate()

        filter.date = {
            gte: startDate,
            lte: endDate
        }
    }

    if(type) {
        filter.type = type
    }

    if(categoryId) {
        filter.categoryId = categoryId  
    }

    try {
        const transactions = await prisma.transaction.findMany({
            where: filter,
            orderBy: {
                date: "desc"
            },
            include: {
                category: {
                    select: {
                        color: true,
                        name: true,
                        type: true
                    }
                }
            }
        })
        res.status(200).json({transactions})
    } catch (error) {
        res.status(500).json({message: "Erro ao obter transações", error})
    }
}
