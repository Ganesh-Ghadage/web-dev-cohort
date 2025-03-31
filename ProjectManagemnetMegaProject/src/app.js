import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'

import healthCheckRouter from "./routes/healthcheck.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "PUT", "UPDATE", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use('/api/v1/healthCheck', healthCheckRouter)

export default app