
var express = require('express');

let app = express();

app.get('/', async (req, res) => {
    res.send('products');
});

app.get('/healthy', async (req, res) => {
  res.status(200).send('readyness: ok');
});

app.get('/healthz', async (req, res) => {
  res.status(200).send('liveness: ok');
});


let port = normalizePort(process.env.PORT || '3000');
app.listen(port, () => {
    console.log('Server listen on port ' + port);
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
