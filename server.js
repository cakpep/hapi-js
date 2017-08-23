'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add Data book
const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().length(10),
    pageCount: Joi.number(),
    datePublished: Joi.date().iso()
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
server.route({
    method: 'GET',
    path: '/profile/{name}',
    handler: function (request, reply) {
        reply('Hello ' + request.params.name + '!');
    },
    config: {
        validate: {
            params: {
                name: Joi.string().min(3).max(10)
            }
        }
    }
});
server.route({
    method: 'GET',
    path: '/books',
    config: {
        handler: function (request, reply) {

            getBooks((err, books) => {

                if (err) {
                    return reply(err);
                }

                return reply(books);
            });
        },
        response: {
            sample: 50,
            schema: Joi.array().items(bookSchema)
        }
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
