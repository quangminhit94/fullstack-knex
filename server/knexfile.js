// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://postgres:root@localhost:5432/my_life'
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
