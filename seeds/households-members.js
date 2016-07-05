'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('households-members').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('households-members').insert({id: 1, households_id: 1, members_id: 1}),
        knex('households-members').insert({id: 2, households_id: 1, members_id: 2}),
        knex('households-members').insert({id: 3, households_id: 2, members_id: 1}),
        knex('households-members').insert({id: 4, households_id: 2, members_id: 2}),
        knex('households-members').insert({id: 5, households_id: 3, members_id: 1}),
        knex('households-members').insert({id: 6, households_id: 3, members_id: 2}),
        knex('households-members').insert({id: 7, households_id: 3, members_id: 3}),
        knex('households-members').insert({id: 8, households_id: 4, members_id: 4}),
        knex('households-members').insert({id: 9, households_id: 4, members_id: 5}),
        knex('households-members').insert({id: 10, households_id: 1, members_id: 5}),
        knex('households-members').insert({id: 11, households_id: 3, members_id: 6}),
        knex('households-members').insert({id: 12, households_id: 2, members_id: 4}),

      ]);
    });
};
