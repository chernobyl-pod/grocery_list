'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('members').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('members').insert({id: 1, name: 'Roy Chase', email:'roychase@slam.com', password:'$2a$10$1BbK1.a0a4.IxZP.jP1vqObZHO176CAbCT3.RQyIcGj7hjsq8OExi'}),
        knex('members').insert({id: 2, name: 'Mike Mes', email:'mikemes@slam.com', password:'$2a$10$52La/4T/8S9jmoN8UWsTkew3vvdxe3nnyYl/if0OR9Wfh650KX1oS'}),
        knex('members').insert({id: 3, name: 'Jim Stafford', email:'jstaff@slam.com', password:'$2a$10$1slaMPkBR1h9cfdjDaXPVeOpCzS2d3gBVCEvLtK5c5l.hXVpf1CNe'}),
        knex('members').insert({id: 4, name: 'user42', email:'user42@slam.com', password:'$2a$10$8c/jD5X.xzlG8KShd0COUuw17U0ifUdfEAxW8puTHcMu2RgkyvSti'}),
        knex('members').insert({id: 5, name: 'user76', email:'user76@slam.com', password:'$2a$10$fQcxGxBVSlklCNnulEMITuQjdqLz4cFZoURptYYblxMskTV2plWN6'}),
        knex('members').insert({id: 6, name: 'user23', email:'user23@slam.com', password:'$2a$10$fQcxGxBVSlklCNnulEMITuQjdqLz4cFZoURptYYblxMskTV2plWN6'})
      ]);
    });
};
