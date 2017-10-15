// db connection
const Config = require('./config');
module.exports = require( 'knex' )( Config.database);