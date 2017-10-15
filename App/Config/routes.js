const Hapi = require('hapi');
const server = new Hapi.Server();
const Birds = require('../Model/Birds');
const Config = require('./config');

server.connection( {
    port: Config.server.port
} );

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply({
            error: false,
            message: `Server started at ${ server.info.uri }`,
        });
    }
});

server.route( {

    method: 'GET',
    path: '/birds',
    handler: ( request, reply ) => {
        console.log(request.query);
        reply(
            Birds.findAll()
        );
    }

} );

server.route({
    method: 'GET',
    path: '/birds/{id}',
    handler: function (request, reply) {
        reply(
            Birds.findById(encodeURIComponent(request.params.id))
        );
    }
});

module.exports = server;