import express, { json } from "express";
import http from "http";
import { Server } from "socket.io";
import Redis from "ioredis";

const app = express();
const PORT = process.env.PORT || 8000;

const httpServer = http.createServer(app);

const io = new Server();
io.attach(httpServer);

const redis = new Redis({ host: "localhost", port: 6379 });
const publisher = new Redis({ host: "localhost", port: 6379 });
const subscriber = new Redis({ host: "localhost", port: 6379 });

// const checkboxState = new Array(100).fill(false)
await redis.setnx("state", JSON.stringify(new Array(100).fill(false)));

await subscriber.subscribe('server:broker')
await subscriber.on('message', (channel, message) => {
  const {event, data} = JSON.parse(message)

  io.emit(event, data)
})

io.on("connection", (socket) => {
	console.log(`Socket connected - ${socket.id}`);
	socket.on("message", (msg) => {
		io.emit("server-msg", msg);
	});

	socket.on("checkbox-update", async (data) => {
		// checkboxState[data.index] = data.value
		// io.emit('checkbox-update', data)
		const state = await redis.get("state");
		const parsedState = JSON.parse(state);
		parsedState[data.index] = data.value;

    await redis.set('state', JSON.stringify(parsedState))
		await publisher.publish(
			"server:broker",
			JSON.stringify({ event: "checkbox-update", data: data })
		);
	});
});

app.use(express.static("./public"));

app.get("/", (req, res) => {
	return res.json({ message: "Hello from ws" });
});

app.get("/checkbox-state", async (req, res) => {
  const state = await redis.get('state')
  if(state) {
    const parsedState = JSON.parse(state)
    return res.json({ state: parsedState });
  }
	return res.json({ state: [] });
});

httpServer.listen(PORT, () => {
	console.log(`Server is listening to port ${PORT}`);
});
