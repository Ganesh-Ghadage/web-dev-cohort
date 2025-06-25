import { Redis } from "ioredis";

const redisConnetion = new Redis({
	host: "localhost",
	port: 6379,
	maxRetriesPerRequest: null,
});

export default redisConnetion;
