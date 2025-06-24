import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express()
const PORT = process.env.PORT || 8000

const httpServer = http.createServer(app)

const io = new Server()
io.attach(httpServer)

const checkboxState = new Array(100).fill(false)

io.on('connection', (socket) => {
  console.log(`Socket connected - ${socket.id}`)
  socket.on('message', msg => {
    io.emit('server-msg', msg)
  })

  socket.on('checkbox-update', (data) => {
    checkboxState[data.index] = data.value
    io.emit('checkbox-update', data)
  })
})

app.use("/static", express.static('./public'))

app.get('/', (req, res) => {
  return res.json({message: "Hello from ws"})
})

app.get('/checkbox-state', (req, res) => {
  res.json({state: checkboxState})
})


httpServer.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`)
})