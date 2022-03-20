const Course = require('../../schemas/Course');

async function GetCourseDoc(queries) {
	// function to accept the queries and returning all the documents in collection

	try {
		const status = await Course.find(queries);
		return status;
	} catch (err) {
		return err.message;
	}
}

module.exports = GetCourseDoc;
