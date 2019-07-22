const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const server = express();
const Users = require('./data/helpers/dbModel');
const mw = require('./data/helpers/middleware');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/api/users', async (req, res) => {
   try {
      const user = await Users.get();
      res.status(200).json(user);
   } catch (error) {
      res.status(500).json('Oops! We missed that. Hang on, let\'s fix it together');
   };
});

server.post('/auth/register', mw.validateUser, async (req, res) => {
   const { password } = req.body;
   const hashed = bcrypt.hashSync(password, 16);
   req.body.password = hashed;
   try {
      const { id, username } = await Users.insertUser(req.body);
      res.status(201).json({ message: `Hooray! Welcome Aboard, ${username}!!`, id, username })
   }
   catch (error) {
      res.status(500).json('Oops! We missed that. Hang on, let\'s fix it together');
   }
})

server.post('/auth/login', mw.validateUser, async (req, res) => {
   let { username, password } = req.body
   Users.getBy({ username })
      .first()
      .then(user => {
         if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}!` });
         } else {
            res.status(401).json({ message: 'Oops! Invalid Credentials' });
         }
      })
      .catch(error => {
         res.status(401).json({ message: 'Oops! Invalid Credentials' });
      });
})

module.exports = server;