// db connection
export default require( 'knex' )( {
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'root',
		password: 'cakpep',
		database: 'hapijs_rest',
		charset: 'utf8',
	},
  	useNullAsDefault: true
} );