'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.table('food', function(table) {
    table.integer('quantity');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumns('quantity');
};
