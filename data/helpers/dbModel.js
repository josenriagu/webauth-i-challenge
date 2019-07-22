const db = require('../../config/dbConfig');

module.exports = {
   get: function () {
      return db('users');
   },

   getUserById: function (id) {
      return db('users')
         .where({ id })
         .first();
   },

   insertUser: function (user) {
      return db('users')
         .insert(user)
         .then(([id]) => {
            return this.getUserById(id);
         });
   }
}