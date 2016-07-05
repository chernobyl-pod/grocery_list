'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('households').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('households').insert({id: 1, name: 'Chernobyl-Pods'}),
        knex('households').insert({id: 2, name: 'Chase'}),
        knex('households').insert({id: 3, name: 'Mesereau'}),
        knex('households').insert({id: 4, name: 'Stafford'})
      ]);
    });
};
