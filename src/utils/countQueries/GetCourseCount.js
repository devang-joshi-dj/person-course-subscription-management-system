const Course = require('../../schemas/Course');

async function GetCourseCount(flag) {
	// function to accept the flag and returning counts of documents based on the flag in collection

	try {
		const status = await Course.aggregate([{ $group: { _id: `$${flag}`, count: { $sum: 1 } } }]);
		return status;
	} catch (err) {
		return err.message;
	}
}

module.exports = GetCourseCount;
