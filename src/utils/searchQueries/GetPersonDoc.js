const Person = require('../../schemas/Person');

async function GetPersonDoc(queries) {
	// function to accept the queries and returning all the documents in collection

	try {
		const status = await Person.find(queries);
		return status;
	} catch (err) {
		return err.message;
	}
}

module.exports = GetPersonDoc;
