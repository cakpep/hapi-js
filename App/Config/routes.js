const Hapi = require('hapi');
const server = new Hapi.Server();
const Birds = require('../Model/Birds');
const Config = require('./config');
const Bcrypt = require('bcrypt');

server.connection( {
    port: Config.server.port
} );

// validation function used for hapi-auth-basic
var basicValidation  = function (request, username, password, callback) {
    var user = Config.basicAuth.users[ username ]

    if (!user) {
      return callback(null, false)
  }

  Bcrypt.compare(password, user.password, function (err, isValid) {
      callback(err, isValid, { id: user.id, username: user.username })
  })
}

server.register(require('hapi-auth-basic'), (err) => {
    server.auth.strategy('simple', 'basic', { validateFunc: basicValidation });

    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply({
                    error: false,
                    message: `Server started at ${ server.info.uri }`,
                });
            }
        }
    });

    server.route( {

        method: 'GET',
        path: '/birds',
        config: {
            auth: 'simple',
            handler: ( request, reply ) => {
                reply(
                    Birds.findAll()
                );
            }
        }
    } );

    server.route({
        method: 'GET',
        path: '/birds/{id}',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply(
                    Birds.findById(encodeURIComponent(request.params.id))
                );
            }
        }
    });

});
module.exports = server;