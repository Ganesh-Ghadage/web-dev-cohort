import notificationWorker from "./workers/notificationWorker.js"

async function init() {
  await notificationWorker.run()
}

init()