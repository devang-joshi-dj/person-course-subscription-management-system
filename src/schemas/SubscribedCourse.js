const mongoose = require('mongoose');

// Schema for SubscribedCourse Collection
const subscribedSchema = new mongoose.Schema({
	CourseID: {
		type: String,
		required: true,
	},
	PersonID: {
		type: String,
		required: true,
	},
	UUID: {
		type: String,
		required: true,
	},
	Status: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('SubscribedCourse', subscribedSchema);
