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
   }
}