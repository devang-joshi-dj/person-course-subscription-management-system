const Person = require('../../schemas/Person');

async function GetPersonCount(flag) {
	// function to accept the queries and returning all the documents in collection

	try {
		const status = await Person.aggregate([{ $group: { _id: `$${flag}`, count: { $sum: 1 } } }]);
		return status;
	} catch (err) {
		return err.message;
	}
}

module.exports = GetPersonCount;
