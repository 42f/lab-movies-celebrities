// Iteration #1

require('../db/index.js')
const mongoose = require("mongoose");
const Celebrity = require('../models/Celebrity.model.js')

const drones = [
  { name: "Ru Paul", occupation: "star", catchPhrase: "don't fuck it up!" },
  { name: "Michael Scott", catchPhrase: "People say I'm the best boss" },
  { name: "Steve Jobs", occupation: "Dead CEO", catchPhrase: "Think different" }
];

async function seedDrones() {
	try {
		await Celebrity.deleteMany();
		const seededDrones = await Celebrity.create(drones);
		console.log(`${seededDrones.length} celebrities were seeded.`);
		await mongoose.connection.close();
	} catch (err) {
		console.error(err);
	}
}

seedDrones();
