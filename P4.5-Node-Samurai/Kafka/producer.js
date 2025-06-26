import kafka from "./client.js";
import readline from "node:readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function init() {
	const producer = kafka.producer();

	console.log(`Connecting Produncer...`);
	await producer.connect();
	console.log(`Producer connected successfully...`);

	rl.setPrompt("> ");
	rl.prompt();

	rl.on("line", async (line) => {
		if(!line) {
			return null
		}
		const [name, location] = line.split(" ");

		await producer.send({
			topic: "rider-updates",
			messages: [
				{
					partition: location.toLowerCase() === "north" ? 0 : 1,
					key: "rider",
					value: JSON.stringify({ name: name, location }),
				},
			],
		});
	}).on("close", async () => {
		console.log(`Disconnecting producer...`);
		await producer.disconnect();
		console.log(`Producer disconnected successfully...`);
	});
}

init();
