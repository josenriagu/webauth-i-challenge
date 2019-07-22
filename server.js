const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
   try {
      res.status(200).json('You have seen the light. Shine on!')
   } catch (error) {
      res.status(500).json('Oops! We missed that. Hang on, let\'s fix it together')
   }
});

module.exports = server;