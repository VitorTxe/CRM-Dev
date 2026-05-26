import type { TransactionType } from "@prisma/client"
import type { CategorySummary } from "./category.types.js"

export interface TransactionFilter {
    userId: string,
    categoryId?: string,
    type?: TransactionType,
    date?: {
        gte: Date,
        lte: Date
    }
}

export interface TransactionSummary {
    totalExpenses: number,
    totalIncome: number,
    balance: number,
    expesesByCategory: CategorySummary[]
}
    
