import z from "zod"
import { ObjectId } from "mongodb"
import { error } from "node:console"

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id)

export const createTransactionSchema = z.object({
    description: z.string().min(1, "Descrição deve ter pelo menos 1 caractere"),
    amount: z.number().positive("Valor deve ser positivo"),
    date: z.coerce.date({ error: "Data inválida" }),
    categoryId: z.string().refine(isValidObjectId, "Categoria invalida"),
    type: z.enum(["income", "expense"])
})

export const getTransactionsSchema = z.object({
    month: z.string().optional(),
    year: z.string().optional(),
    type: z.enum(["income", "expense"]).optional(),
    categoryId: z.string().optional(),
})

export const getTransactionSummarySchema = z.object({
    month: z.string({error: "Mes é obrigatorio"}),
    year: z.string({error: "Ano é obrigatorio"}),
})

export type GetTransactionsQuery = z.infer<typeof getTransactionsSchema>
export type GetTransactionSummaryQuery = z.infer<typeof getTransactionSummarySchema>
