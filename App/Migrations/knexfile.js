
// Create a new migration  file with    [knex migrate:make Datastructure].
// to run migrations use                [knex migrate:latest]
// to create seeder                     [knex seed:make 02_Birds]
//  to execute the seeaders             [knex seed:run]
module.exports = {
    development: {
        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'cakpep',
            database: 'hapijs_rest',
            charset: 'utf8',
        }
    }
};