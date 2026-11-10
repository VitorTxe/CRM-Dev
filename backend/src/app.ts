import express from "express"
import type {Express} from "express"
import router from "./routes/index.js"
import cors from "cors"

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(router)

export default app