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
<<<<<<< HEAD
    client: 'postgres',
    connection: process.env.DATABASE_URL
=======
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
>>>>>>> f2462a17272f26e060cc70e8165dfa14124c70b9
  }
};
