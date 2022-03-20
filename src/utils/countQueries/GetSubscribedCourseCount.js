const SubscribedCourse = require('../../schemas/SubscribedCourse');

async function GetSubscribedCourseCount(flag) {
	// function to accept the queries and returning all the documents in collection

	try {
		const status = await SubscribedCourse.aggregate([
			{ $group: { _id: `$${flag}`, count: { $sum: 1 } } },
		]);
		return status;
	} catch (err) {
		return err.message;
	}
}

module.exports = GetSubscribedCourseCount;
