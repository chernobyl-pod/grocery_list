'use strict';
exports.up = function(knex, Promise) {
  knex.schema.createTable('households-recipes', function(table) {
    table.increments();
    table.integer('households_id');
    table.integer('recipes_id');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('households-recipes');
};
