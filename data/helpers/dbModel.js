const db = require('../../config/dbConfig');

module.exports = {
   get: function () {
      return db('users')
         .select('id', 'username'); // returns only the id and username fields. not cool to show the password hashes
   },

   getUserById: function (id) {
      return db('users')
         .where({ id })
         .first();
   },

   getBy: function (filter) {
      return db('users')
         .where(filter);
   },

   insertUser: function (user) {
      return db('users')
         .insert(user)
         .then(([id]) => {
            return this.getUserById(id);
         });
   }
}