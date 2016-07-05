'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('recipes').insert({id: 1, name: 'spaghetti', category: 'italian'}),
        knex('recipes').insert({id: 2, name: 'steak', category: 'american'}),
        knex('recipes').insert({id: 3, name: 'lasagna', category: 'italian'}),
        knex('recipes').insert({id: 4, name: 'pesto chicken', category: 'italian'}),
        knex('recipes').insert({id: 5, name: 'lemon chicken', category: 'american'})
      ]);
    });
};
