const SubscribedCourse = require('../../schemas/SubscribedCourse');

async function GetSubscribedCourseDoc(queries) {
	// function to accept the queries and returning all the documents in collection

	try {
		const status = await SubscribedCourse.find(queries);
		return status;
	} catch (err) {
		return err.message;
	}
}

module.exports = GetSubscribedCourseDoc;
