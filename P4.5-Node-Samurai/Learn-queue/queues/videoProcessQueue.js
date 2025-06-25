import { Queue } from "bullmq";
import { queueMap } from "../constants.js";
import redisConnetion from "../redisConnection.js";

const videoProcessingQueue = new Queue(queueMap.videoProcessQueue, {
	connection: redisConnetion,
});

export default videoProcessingQueue