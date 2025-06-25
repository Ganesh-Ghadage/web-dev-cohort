import { Worker } from "bullmq";
import redisConnetion from "../redisConnection.js";
import { queueMap } from "../constants.js";

const notificationWorker = new Worker(queueMap.notificationQueue,
  async (job) => {
    console.log(`------------- ${job.id} ------------------`)
    console.log(`Notification sent for - ${job.data}`)
    console.log(`-------------------------------------------`)
  }, 
  {
    connection: redisConnetion,
    autorun: false,
    concurrency: 10,  // how many jobs to run at a time
    limiter: {       // rate limiter for jobs
      max: 10,           // max jobs to run within limit
      duration: 10 * 1000 // duration of rate limiter
    }
  }
)

export default notificationWorker