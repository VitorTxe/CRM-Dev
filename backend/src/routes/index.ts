import { Router } from "express"
import categoryRoutes from "./category.routes.js"
import transactionRoutes from "./transaction.routes.js"

const router = Router()

router.get("/teste", (req, res) => {
    res.json({ status: "OK", message: "Hello World" })
})

router.use('/categories', categoryRoutes)
router.use('/transactions', transactionRoutes) // Montagem limpa e única no padrão RESTful plural

export default router