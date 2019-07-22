const express = require('express')

const router = express.Router();

router.get('/users', (req, res) => {
   const { id, username } = req.user;

   try {
      res.status(200).json({ id, username });
   } catch (error) {
      res.status(500).json('Oops! We missed that. Hang on, let\'s fix it together');
   };
})

module.exports = router;