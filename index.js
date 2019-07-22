const server = require('./server');

const port = process.env.PORT || 9009;

server.listen(port, () => {
   console.log(`Server locked and loaded on port ${port}!!`)
});