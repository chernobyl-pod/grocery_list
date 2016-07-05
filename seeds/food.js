'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('food').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('food').insert({name: 'Chicken Breast'}),
        knex('food').insert({name: 'spaghetti'}),
        knex('food').insert({name: 'penne'}),
        knex('food').insert({name: 'pesto suace'}),
        knex('food').insert({name: 'NY Strip Steak'})
      ]);
    });
};
