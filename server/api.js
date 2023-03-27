// const express = require('express');
// const app = express();
const path = require('path');

// app.use('/public', express.static(path.join(__dirname, '../public')));
// app.use('/dist', express.static(path.join(__dirname, '../dist')));

// app.get('/', (req, res, next) => {
//   try {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
//   } catch (error) {
//     next(error);
//   }
// });

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500).send(err.message);
// });

var fs = require('fs');
var http = require('http');
var https = require('https');
const dotenv = require('dotenv');
dotenv.config();
var privateKey = process.env.EC_PRIVATE_KEY;
var certificate = process.env.EC_PRIVATE_CERT;
var credentials = { key: privateKey, cert: certificate };
var express = require('express');
var app = express();

// your express configuration here

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// For http
httpServer.listen(1953);
// For https
httpsServer.listen(2023);

app.get('/', function (req, res) {
  res.header('Content-type', 'text/html');
  return res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
