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
		type: Number,
		required: false,
		min: 1000000000,
		validate: {
			validator: function (val) {
				if (val) return val.toString().length === 10;
			},
			message: val => `${val.value} has to be 10 digits`,
		},
	},
});

module.exports = mongoose.model('Persons', personSchema);
