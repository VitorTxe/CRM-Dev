import type {Response} from "express"
import type {QueryRequest} from "../../types/http.types.js"
import type {GetTransactionSummaryQuery} from "../../schemas/transaction.schemas.js"
import prisma from "../../config/prisma.js"
import dayjs from "dayjs"


export const getTransactionSummary = async (req:QueryRequest<GetTransactionSummaryQuery>, res:Response): Promise<void> => {
    const userId = "FEDSADa32#@#"

    if(!userId) {
        res.status(401).json({message: "Usuario não autenticado"})
        return
    }

    const {month, year} = req.query

    const startDate = dayjs(`${year}-${month}-01 `).startOf("month").toDate()
    const endDate = dayjs(startDate).endOf("month").toDate()

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
        console.log(transactions)
        res.status(200).json({transactions})
    } catch (error) {
        res.status(500).json({message: "Erro ao obter transações", error})
    }
    
 }
    