const uuid = require('uuid-random');
const Person = require('../../schemas/Person');

async function InsertPerson(payload) {
	// function to accept the payload and create a user object and store in collection as document

	const person = new Person({
		UUID: uuid(),
		Name: payload.Name,
		Age: payload.Age,
		Gender: payload.Gender,
		Email: payload.Email,
		Mobile: payload.Mobile,
	});

	try {
		const status = await person.save();
		return status;
	} catch (err) {
		return err.message;
	}
}

module.exports = InsertPerson;
