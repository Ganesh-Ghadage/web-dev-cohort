import express from "express";
import { z } from "zod";
import videoProcessingQueue from "./queues/videoProcessQueue.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json())

const videoProcessRequestSchema = z.object({
	videoUrl: z.string(),
});

app.get("/", (req, res) => {
	return res.json({ status: "Server is up and running" });
});

app.post("/video-process", async (req, res) => {
	const validationResult = videoProcessRequestSchema.safeParse(req.body);

	if (validationResult.error) {
		return res
			.status(400)
			.json({ message: "Invalid data", error: validationResult.error });
	}

	const { videoUrl } = validationResult.data;

	const job = await videoProcessingQueue.add(
		`video-prcess-${videoUrl}`,
		videoUrl
	);

	// console.log(job)

	return res.status(200).json({ message: "Video enqued", jobId: job.id });
});

app.listen(PORT, () => {
	console.log(`Sever is listening to Port : ${PORT}`);
});
