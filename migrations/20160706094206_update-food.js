
exports.up = function(knex, Promise) {
  return knex.schema.table('food', function(table) {
    table.string('image_url');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumns('image_url');
};
