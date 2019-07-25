exports.up = function (knex) {
   return knex.schema.createTable('users', user => {
      user.increments();
      user.string('username', 128).unique().notNullable();
      user.string('password', 128).notNullable();
   })
};

exports.down = function (knex) {
   return knex.schema.dropTableIfExists('users');
};
