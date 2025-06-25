import { Worker } from "bullmq";
import { queueMap } from "../constants.js";
import redisConnetion from "../redisConnection.js";
import notificatioQueue from "../queues/notificationQueue.js";

const wait = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));

const videoProcessingWorker = new Worker(
	queueMap.videoProcessQueue,
	async (job) => {
		console.log(`------------- ${job.id} ------------------`);
		console.log(`Processing video - ${job.data}`);

		await wait(2);

		console.log(`video processed - ${job.data}`);
		console.log(`-------------------------------------------`);

		const notificationJob = await notificatioQueue.add(
			`Video-fisish-notificatio-${job.id}`,
			job.data
		);

    console.log(`Notifiation job enqued - ${notificationJob.id}`)
		console.log(`-------------------------------------------`);

	},
	{
		connection: redisConnetion,
		autorun: false,
	}
);

export default videoProcessingWorker;
