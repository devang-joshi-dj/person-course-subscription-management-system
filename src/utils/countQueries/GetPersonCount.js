const Person = require('../../schemas/Person');

async function GetPersonCount(flag) {
	// function to accept the flag and returning counts of documents based on the flag in collection

	try {
		const status = await Person.aggregate([{ $group: { _id: `$${flag}`, count: { $sum: 1 } } }]);
		return status;
	} catch (err) {
		return err.message;
	}
}

module.exports = GetPersonCount;
