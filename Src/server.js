//import Hapi from 'hapi';
'use strict';


// import Knex from './App/Config/knex';
//const Knex = require('../App/Config/knex');

const server = require('../App/Config/routes');
server.start( err => {
    if( err ) {
        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );
    }
    console.log( `Server started at ${ server.info.uri }` );
} );