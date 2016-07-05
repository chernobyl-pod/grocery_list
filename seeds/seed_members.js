'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('members').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('members').insert({name: 'Roy Chase', email:'roychase@slam.com', password:'1234'}),
        knex('members').insert({name: 'Mike Mes', email:'mikemes@slam.com', password:'1234'}),
        knex('members').insert({name: 'Jim Stafford', email:'jstaff@slam.com', password:'1234'}),
        knex('members').insert({name: 'user42', email:'user42@slam.com', password:'1234'}),
        knex('members').insert({name: 'user76', email:'user76@slam.com', password:'1234'}),
        knex('members').insert({name: 'user23', email:'user23@slam.com', password:'1234'})
      ]);
    });
};
