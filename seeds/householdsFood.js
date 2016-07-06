'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('households-food').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('households-food').insert({id: 1, households_id: 1, food_id: 2}),
        knex('households-food').insert({id: 2, households_id: 2, food_id: 1}),
        knex('households-food').insert({id: 3, households_id: 3, food_id: 1}),
        knex('households-food').insert({id: 4, households_id: 4, food_id: 5}),
        knex('households-food').insert({id: 5, households_id: 3, food_id: 5}),
        knex('households-food').insert({id: 6, households_id: 2, food_id: 5}),
        knex('households-food').insert({id: 7, households_id: 1, food_id: 5}),
        knex('households-food').insert({id: 8, households_id: 4, food_id: 3})
      ]);
    });
};
