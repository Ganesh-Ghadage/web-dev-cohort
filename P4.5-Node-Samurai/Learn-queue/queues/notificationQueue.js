import { Queue } from "bullmq";
import redisConnetion from "../redisConnection.js";
import { queueMap } from "../constants.js";

const notificatioQueue = new Queue(queueMap.notificationQueue, {
	connection: redisConnetion,
});

export default notificatioQueue