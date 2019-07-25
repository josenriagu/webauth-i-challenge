const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');

const mw = require('../data/helpers/middleware');
const Users = require('../data/helpers/dbModel');

router.post('/register', async (req, res) => {
   const { password } = req.body;
   const hashed = bcrypt.hashSync(password, 16);
   req.body.password = hashed;
   try {
      const { id, username } = await Users.insertUser(req.body);
      res.status(201).json({ message: `Hooray! Welcome Aboard, ${username}!!`, id, username })
   }
   catch (error) {
      res.status(500).json('Oops! We missed that. Hang on, let\'s fix it together');
   };
});

router.post('/logout', (req, res) => {
   if (req.session) {
      req.session.destroy(err => {
         if (err) {
            res.send('Oops! you can\'t leave now. Please try again in a short while');
         } else {
            res.send('Aww! See ya later!');
         }
      });
   } else {
      res.end();
   }
});

router.post('/login', mw.validateLogin, (req, res) => {
   const user = req.user;
   try {
      res.status(200).json({ message: `Welcome ${user.username}!` });
   } catch (error) {
      res.status(500).json('Oops! We missed that. Hang on, let\'s fix it together');
   };
});

module.exports = router;