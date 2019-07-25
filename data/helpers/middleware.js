const Users = require('../helpers/dbModel');
const bcrypt = require('bcryptjs');

module.exports = {
   validateUser: function (req, res, next) {
      if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
         if (req.body.username && req.body.password) {
            next();
         } else {
            res.status(400).json({ message: 'Nahhhhh! You missed the required username and/or password fields' })
         }
      } else {
         res.status(400).json({ message: 'You must be kidding! Where is the user data?' })
      };
   },

   validateLogin: function (req, res, next) {
      let { username, password } = req.body
      Users.getBy({ username })
         .first()
         .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
               req.session.user = user; // sets the session for the user
               req.user = user;
               next();
            } else {
               res.status(401).json({ message: 'Oops! Invalid Credentials' });
            }
         })
         .catch(() => {
            res.status(401).json({ message: 'Oops! Invalid Credentials' });
         });
   },

   restrict: function (req, res, next) {
      if (req.session && req.session.user) {
         next();
      } else {
         res.status(400).json({ message: 'Oops! No Credentials' });
      }
   }
}