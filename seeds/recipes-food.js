'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes-food').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('recipes-food').insert({id: 1, recipes_id: 1, food_id: 1}),
        knex('recipes-food').insert({id: 2, recipes_id: 2, food_id: 2}),
        knex('recipes-food').insert({id: 3, recipes_id: 3, food_id: 3}),
        knex('recipes-food').insert({id: 4, recipes_id: 1, food_id: 4})
      ]);
    });
};
