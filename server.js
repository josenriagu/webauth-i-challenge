const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const server = express();

const mw = require('./data/helpers/middleware');
const authRouter = require('./auth/authRouter');
const mainRouter = require('./main/mainRouter');

server.use(express.json());
server.use(helmet());
server.use(session({
   name: 'sessionId', // name of the cookie
   secret: 'someVeryAndReallyLongPieceOfString', // we intend to encrypt
   cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true,
   },
   resave: false,
   saveUninitialized: true,
   store: new knexSessionStore({
      knex: require('./config/dbConfig.js'), // configured instance of knex
      tablename: 'sessions', // table that will store sessions inside the db, name it anything you want
      sidfieldname: 'sid', // column that will hold the session id, name it anything you want
      createtable: true, // if the table does not exist, it will create it automatically
      clearInterval: 1000 * 60 * 60, // time it takes to check for old sessions and remove them from the database to keep it clean and performant
   })
}));
server.use(cors());

server.use('/api/restricted', mw.restrict, mainRouter);
server.use('/auth', mw.validateUser, authRouter);

module.exports = server;