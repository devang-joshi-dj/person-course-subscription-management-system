'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');

const InsertPerson = require('./src/utils/insertQueries/InsertPerson');
const InsertCourse = require('./src/utils/insertQueries/InsertCourse');
const InsertSubscribedCourse = require('./src/utils/insertQueries/InsertSubscribedCourse');

const GetPersonDoc = require('./src/utils/searchQueries/GetPersonDoc');
const GetCourseDoc = require('./src/utils/searchQueries/GetCourseDoc');
const GetSubscribedCourseDoc = require('./src/utils/searchQueries/GetSubscribedCourseDoc');

const GetCourseCount = require('./src/utils/countQueries/GetCourseCount');
const GetPersonCount = require('./src/utils/countQueries/GetPersonCount');
const GetSubscribedCourseCount = require('./src/utils/countQueries/GetSubscribedCourseCount');

const init = async () => {
	// initalising server
	const server = Hapi.server({
		port: 5000,
		host: 'localhost',
	});

	// establishing connection with mongo
	mongoose.connect(
		'mongodb://localhost/person-course-subscription',
		() => console.log('Connected with database'),
		e => console.error(e)
	);

	// View for Root domain of home.html
	await server.register(require('@hapi/vision'));

	server.views({
		engines: {
			html: require('handlebars'),
		},
		relativeTo: __dirname,
		path: 'src/templates',
	});

	// root route with all important links
	server.route({
		method: 'GET',
		path: '/',
		handler: function (request, h) {
			return h.view('home');
		},
	});

	// Status Wise Course Count
	server.route({
		method: 'GET',
		path: '/swcc',
		handler: async function (request, h) {
			const status = await GetCourseCount('Status');
			return status;
		},
	});

	// Age Wise Person Count
	server.route({
		method: 'GET',
		path: '/awpc',
		handler: async function (request, h) {
			const status = await GetPersonCount('Age');
			return status;
		},
	});

	// Course ID wise subscribed courses count
	server.route({
		method: 'GET',
		path: '/ciwscc',
		handler: async function (request, h) {
			const status = await GetSubscribedCourseCount('CourseID');
			return status;
		},
	});

	// Person ID wise subscribed courses count
	server.route({
		method: 'GET',
		path: '/piscc',
		handler: async function (request, h) {
			const status = await GetSubscribedCourseCount('PersonID');
			return status;
		},
	});

	// Status wise subscribed courses count
	server.route({
		method: 'GET',
		path: '/swscc',
		handler: async function (request, h) {
			const status = await GetSubscribedCourseCount('Status');
			return status;
		},
	});

	// 404 Not Found
	server.route({
		method: '*',
		path: '/{any*}',
		handler: function (request, h) {
			return '404 Error! Page Not Found!';
		},
	});

	// Adding Person API
	server.route({
		method: 'POST',
		path: '/addperson',
		handler: async function (request, h) {
			const payload = request.payload;
			const status = await InsertPerson(payload);

			return status;
		},
	});

	// Adding Course API
	server.route({
		method: 'POST',
		path: '/addcourse',
		handler: async function (request, h) {
			const payload = request.payload;
			const status = await InsertCourse(payload);

			return status;
		},
	});

	// Adding Subscribed Course API
	server.route({
		method: 'POST',
		path: '/addsubscribedcourse',
		handler: async function (request, h) {
			const payload = request.payload;

			const courseStatus = await GetCourseDoc({ UUID: payload.CourseID });
			const personStatus = await GetPersonDoc({ UUID: payload.PersonID });

			if (personStatus.length && courseStatus.length) {
				const status = await InsertSubscribedCourse(payload);
				return status;
			} else {
				return 'Invalid PersonID / Course ID';
			}
		},
	});

	await server.start();
	console.log('Server start on - ', server.info.uri);
};

process.on('uncaughtRejection', err => {
	console.log(err);
	process.exit(1);
});

init();
