'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('households-members', function(table) {
    table.increments();
    table.integer('households_id');
    table.integer('members_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('households-members');
};
