'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', function(table) {
    table.increments();
    table.string('name');
    table.string('category');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes');
};
