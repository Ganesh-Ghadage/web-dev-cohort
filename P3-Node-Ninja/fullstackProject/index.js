import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './utils/db.js'
import cookieParser from 'cookie-parser'

// routes import
import userRouter from './routes/user.routes.js'

dotenv.config()

const app = express()

const port = process.env.PORT || 4000

app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello from express')
})

app.use('/api/v1/user', userRouter)

connectDB()

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})