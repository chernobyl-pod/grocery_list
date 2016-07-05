// Update with your config settings.
'use strict';
module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/groceries',
    pool: {
      min: 1,
      max: 1
    }
  },

  test: {
    client: 'postgres',
    connection: 'postgres://postgres@localhost/test_db',
    pool: {
      min: 1,
      max: 1
    }
  },

  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL

  }
};
