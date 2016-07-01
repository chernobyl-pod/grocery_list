'use strict';
exports.up = function(knex, Promise) {
  knex.schema.createTable('recipes', function(table) {
    table.increments();
    table.string('name');
    table.string('category');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('recipes');
};
