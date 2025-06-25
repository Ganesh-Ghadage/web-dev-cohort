import videoProcessingWorker from "./workers/videoProcessingWorker.js";

async function init() {
  await videoProcessingWorker.run()
}

init()