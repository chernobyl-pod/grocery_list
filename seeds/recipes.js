'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('recipes').insert({name: 'spaghetti', category: 'italian'}),
        knex('recipes').insert({name: 'steak', category: 'american'}),
        knex('recipes').insert({name: 'lasagna', category: 'italian'}),
        knex('recipes').insert({name: 'pesto chicken', category: 'italian'}),
        knex('recipes').insert({name: 'lemon chicken', category: 'american'})
      ]);
    });
};
