const uuid = require('uuid-random');
const SubscribedCourse = require('../../schemas/SubscribedCourse');

async function InsertSubscribedCourse(payload) {
	// function to accept the payload and create a user object and store in collection as document

	const subscribedCourse = new SubscribedCourse({
		CourseID: payload.CourseID,
		PersonID: payload.PersonID,
		UUID: uuid(),
		Status: payload.Status,
	});

	try {
		const status = await subscribedCourse.save();
		return status;
	} catch (err) {
		return err.message;
	}
}

module.exports = InsertSubscribedCourse;
