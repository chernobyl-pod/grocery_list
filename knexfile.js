// Update with your config settings.
'use strict';
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/groceries'
  },

  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL
  }

};
