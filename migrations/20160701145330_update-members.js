'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.table('members', function(table) {
    table.string('email');
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumns('email', 'password');
};
