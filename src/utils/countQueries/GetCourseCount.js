const Course = require('../../schemas/Course');

async function GetCourseCount(flag) {
	// function to accept the queries and returning all the documents in collection

	try {
		const status = await Course.aggregate([{ $group: { _id: `$${flag}`, count: { $sum: 1 } } }]);
		return status;
	} catch (err) {
		return err.message;
	}
}

module.exports = GetCourseCount;
