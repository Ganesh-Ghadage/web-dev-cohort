import kafka from "./client.js"

async function init() {
  const admin = kafka.admin()
  console.log(`Connecting admin...`)
  await admin.connect()
  console.log(`Admin connected successfully...`)

  await admin.createTopics({
    topics: [{
      topic: 'rider-updates',
      numPartitions: 2
    }]
  })

  await admin.disconnect()
  console.log(`Admin disconnected successfully...`)

}

init()