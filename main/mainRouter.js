const express = require('express');
const Users = require('../data/helpers/dbModel');

const router = express.Router();

router.get('/users', async (req, res) => {
   try {
      const users = await Users.get();
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json('Oops! We missed that. Hang on, let\'s fix it together');
   };
})

module.exports = router;