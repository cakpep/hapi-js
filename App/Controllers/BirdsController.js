const Hapi = require('hapi');
const server = new Hapi.Server();
const Birds = require('../Model/Birds');

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