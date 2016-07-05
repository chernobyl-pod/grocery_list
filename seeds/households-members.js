'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('households-members').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('households-members').insert({households_id: 1, members_id: 1}),
        knex('households-members').insert({households_id: 1, members_id: 2}),
        knex('households-members').insert({households_id: 2, members_id: 1}),
        knex('households-members').insert({households_id: 2, members_id: 2}),
        knex('households-members').insert({households_id: 3, members_id: 1}),
        knex('households-members').insert({households_id: 3, members_id: 2}),
        knex('households-members').insert({households_id: 3, members_id: 3}),
        knex('households-members').insert({households_id: 4, members_id: 4}),
        knex('households-members').insert({households_id: 4, members_id: 5}),
        knex('households-members').insert({households_id: 1, members_id: 5}),
        knex('households-members').insert({households_id: 3, members_id: 6}),
        knex('households-members').insert({households_id: 2, members_id: 4}),

      ]);
    });
};
