const http = require('http');

const server = http.createServer(async (req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`);
  const lyrics = url.searchParams.get('lyrics');

  console.log('Received lyrics:', lyrics);

  res.end('DONE');

});

server.listen(3000, () => {
  console.log('Bot server running on port 3000');
});
