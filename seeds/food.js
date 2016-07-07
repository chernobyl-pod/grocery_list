'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('food').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('food').insert({id: 1, name: 'Chicken Breast'}),
        knex('food').insert({id: 2, name: 'Spaghetti'}),
        knex('food').insert({id: 3, name: 'Penne'}),
        knex('food').insert({id: 4, name: 'Pesto Suace'}),
        knex('food').insert({id: 5, name: 'NY Strip Steak'})
      ]);
    });
};
