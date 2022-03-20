const mongoose = require('mongoose');

// Schema for Person Collection
const personSchema = new mongoose.Schema({
	UUID: {
		type: String,
		required: true,
	},
	Name: {
		type: String,
	},
	Age: {
		type: String,
	},
	Gender: {
		type: String,
	},
	Email: {
		type: String,
		required: true,
		lowercase: true,
	},
	Mobile: {
		type: String,
	},
});

module.exports = mongoose.model('Person', personSchema);
