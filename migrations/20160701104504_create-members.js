'use strict';
exports.up = function(knex, Promise) {
  knex.schema.createTable('members', function(table) {
    table.increments();
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('members');
};
