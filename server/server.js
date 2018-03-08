const { createServer } = require('http');
const express = require('express');
const compression = require('compression');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);
// load .env variable to process.env
dotenv.config();

const app = express();

const routing = require('./routing');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

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

const MONGO_URL = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const DB_NAME = `${process.env.DB_NAME}`;

MongoClient.connect(MONGO_URL, (err, client) => {
  if (err) throw err;

  const db = client.db(DB_NAME);

  routing(app, db);
});
