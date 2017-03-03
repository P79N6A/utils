/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description server
 */

'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const server = require('http').createServer(app);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// page route
app.get('/', (req, res) => {
  res.header('Cache-Control', 'max-age=315360000');

  render('./index.html', res);
});

app.get('/test', (req, res) => {
  res.header('Cache-Control', 'max-age=315360000');

  render('./test.html', res);
});

app.get('/index.css', (req, res) => {
  res.header('Cache-Control', 'max-age=315360000');

  res.send('');
});

app.get('/bundle3', (req, res) => {
  res.header('Content-Type', 'application/javascript; charset=utf-8');

  res.send(getFileString('bundle3.js'));
});

app.get('/assets', (req, res) => {
  res.header('Content-Type', 'application/javascript; charset=utf-8');

  res.send(getFileString('assets.js'));
});

// start server
server.listen(8080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('server started');
  }
});

// renderer
function render(page, res) {
  let html = fs.readFileSync(path.join(__dirname, page));

  res.set('Content-Type', 'text/html');
  res.send(html);
}

// getFileString
function getFileString(_path) {
  return fs.readFileSync(path.join(__dirname, _path), 'utf-8');
}
