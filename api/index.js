import express from "express"
import notaRoutes from "./routes/notas.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', notaRoutes)

app.listen(8802)