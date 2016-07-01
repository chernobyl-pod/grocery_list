'use strict';
exports.up = function(knex, Promise) {
  knex.schema.createTable('households-food', function(table) {
    table.increments();
    table.integer('households_id');
    table.integer('food_id');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('households-food');
};
