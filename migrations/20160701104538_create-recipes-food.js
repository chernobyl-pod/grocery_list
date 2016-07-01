'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes-food', function(table) {
    table.increments();
    table.integer('recipes_id');
    table.integer('food_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes-food');
};
