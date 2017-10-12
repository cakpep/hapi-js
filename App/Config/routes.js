const Hapi = require('hapi');
const server = new Hapi.Server();
const Knex = require('knex');

server.connection( {
    port: 8080
} );

server.route( {

    path: '/birds',
    method: 'GET',
    handler: ( request, reply ) => {
        // In general, the Knex operation is like Knex('TABLE_NAME').where(...).chainable(...).then(...)
        const getOperation = Knex( 'birds' ).where( {
            isPublic: 1
        } ).select( 'name', 'species', 'picture_url' ).then( ( results ) => {

            if( !results || results.length === 0 ) {
                reply( {
                    error: true,
                    errMessage: 'no public bird found',
                } );
            }

            reply( {
                dataCount: results.length,
                data: results,
            } );

        } ).catch( ( err ) => {
            reply( 'server-side error' );
        } );
    }

} );


module.exports = server;