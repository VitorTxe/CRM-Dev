import { Router } from "express";
import createTransaction from "../controllers/transactions/createTransactions.controller.js";
import { getTransactions } from "../controllers/transactions/getTransactions.controller.js";
import { getTransactionSummary } from "../controllers/transactions/getTransactionSummary.controller.js";

const transactionRoutes = Router()

transactionRoutes.post('/', createTransaction)
transactionRoutes.get('/', getTransactions)
transactionRoutes.get('/summary', getTransactionSummary) // Sub-caminho específico e exclusivo para o resumo

export default transactionRoutes