
exports.up = function(knex, Promise) {
  return knex.schema.table('recipes', function(table) {
    table.string('allergies');
    table.string('preferred_diet');
    table.string('course');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumns('allergies', 'preferred_diet', 'course');
};
