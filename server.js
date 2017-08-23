'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hapi!');
    }
});
server.route({
    method: 'GET',
    path:'/hello',
    handler: function (request, reply) {

        return reply('hello world');
    }
});
server.route({
    method: 'GET',
    path: '/test/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});
server.route({
    method: ['PUT', 'POST'],
    path: '/profile',
    handler: function (request, reply) {
        reply('I did something!');
    }
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/settings',
        handler: function (request, reply) {
            reply.file('./public/settings.html');
        }
    });
});



// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
