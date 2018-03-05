const { createServer } = require('http');
const express = require('express');
const compression = require('compression');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dev = app.get('env') !== 'production';

if (!dev) {
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));
}
if (dev) {
  app.use(morgan('dev'));
}
// Server index.html file on production
app.use(express.static(path.join(__dirname, '../client/dist')));

// API Test...
app.get('/api/test', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API is working! :)',
  });
  res.end();
});
const server = createServer(app);

server.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server started at http://localhost:${PORT}`); //eslint-disable-line
});

