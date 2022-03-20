const mongoose = require('mongoose');

// Schema for Course Collection
const courseSchema = new mongoose.Schema({
	UUID: {
		type: String,
		required: true,
	},
	Name: {
		type: String,
		required: true,
	},
	Duration: {
		type: String,
	},
	Cost: {
		type: String,
	},
	DueDate: {
		type: Date,
	},
	Status: {
		type: String,
	},
});

module.exports = mongoose.model('courses', courseSchema);
