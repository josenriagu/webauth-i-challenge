const server = require('./server');

const port = process.env.PORT || 9009;

server.get('/', (req, res) => {
   try {
      res.status(200).json('You have seen the light. Shine on!')
   } catch (error) {
      res.status(500).json('Oops! We missed that. Hang on, let\'s fix it together')
   }
});

server.listen(port, () => {
   console.log(`Server locked and loaded on port ${port}!!`)
});