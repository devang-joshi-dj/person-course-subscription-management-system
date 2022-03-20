'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');

const init = async () => {
	// initalising server
	const server = Hapi.server({
		port: 5000,
		host: 'localhost',
	});

	// establishing connection with mongo
	mongoose.connect(
		'mongodb://localhost/employee',
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
		path: 'src/template',
	});

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
		handler: (request, h) => {
			return 'Hello World!';
		},
	});

	// Age Wise Person Count
	server.route({
		method: 'GET',
		path: '/awpc',
		handler: (request, h) => {
			return 'Hello World!';
		},
	});

	// Course ID wise subscribed courses count
	server.route({
		method: 'GET',
		path: '/ciwscc',
		handler: (request, h) => {
			return 'Hello World!';
		},
	});

	// Person ID wise subscribed courses count
	server.route({
		method: 'GET',
		path: '/piscc',
		handler: (request, h) => {
			return 'Hello World!';
		},
	});

	// Status wise subscribed courses count
	server.route({
		method: 'GET',
		path: '/swscc',
		handler: (request, h) => {
			return 'Hello World!';
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
