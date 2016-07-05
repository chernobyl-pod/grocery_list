'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('households').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('households').insert({name: 'Chernobyl-Pods'}),
        knex('households').insert({name: 'Chase'}),
        knex('households').insert({name: 'Mesereau'}),
        knex('households').insert({name: 'Stafford'})
      ]);
    });
};
