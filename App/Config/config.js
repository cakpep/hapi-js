module.exports = {
  // server configuration
  server: {
    port: 8080,
  },
  // Database configuration
  database: {
      client: 'mysql',
      connection: {
        host: 'localhost',
        user: 'root',
        password: 'cakpep',
        database: 'hapijs_rest',
        charset: 'utf8',
      },
      useNullAsDefault: true
  },
  // Logging configuration
  logging: {
    console: {
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: true
    }
  }
}