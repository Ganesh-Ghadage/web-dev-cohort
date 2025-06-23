import express, { Request, Response } from "express"
import axios from 'axios'
import Redis from "ioredis"

const app = express()

const PORT = process.env.PORT || 8080

const redis = new Redis({host: 'localhost', port: 6379})

app.get('/', (req: Request, res: Response) => {
  res.send("Hello from TS + Redis backend")
  return
})


app.get('/products', async (req: Request, res: Response) => {
  const responce = await axios.get('https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=30')

  res.json({ products: responce.data.data.data })
  return
})

app.get('/totalPrice', async (req: Request, res: Response) => {
  const chchedValue = await redis.get("totalProductPrice")

  if(chchedValue){
    console.log(`cache hit`)
    res.json({ totalPrice: chchedValue })
    return
  }

  const responce = await axios.get('https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=30')

  const totalPrice = responce.data.data.data.reduce((acc: number, curr: { price: number }) => curr.price + acc, 0)
  
  await redis.set("totalProductPrice", totalPrice)

  console.log(`cache miss`)
  res.json({ totalPrice })
  return
})

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`)
})