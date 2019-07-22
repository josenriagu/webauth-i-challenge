const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const server = express();
const Users = require('./data/helpers/dbModel');
const mw = require('./data/helpers/middleware');
const authRouter = require('./auth/authRouter');

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api/restricted', mw.restrict, authRouter);

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
   };
})

server.post('/auth/login', mw.validateUser, mw.validateLogin, (req, res) => {
   const user = req.user;
   try {
      res.status(200).json({ message: `Welcome ${user.username}!` });
   } catch (error) {
      res.status(500).json('Oops! We missed that. Hang on, let\'s fix it together');
   };
})

module.exports = server;