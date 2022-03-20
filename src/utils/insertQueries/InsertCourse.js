const uuid = require('uuid-random');
const Course = require('../../schemas/Course');

async function InsertCourse(payload) {
	// function to accept the payload and create a user object and store in collection as document

	const course = new Course({
		UUID: uuid(),
		Name: payload.Name,
		Duration: payload.Duration,
		Cost: payload.Cost,
		DueDate: payload.DueDate,
		Status: payload.Status,
	});

	try {
		const status = await course.save();
		return status;
	} catch (err) {
		return err.message;
	}
}

module.exports = InsertCourse;
