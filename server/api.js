const express = require('express');
const app = express();
const path = require('path');

app.use((req, res, next) => {
  // console.log(req.secure);
  if (!req.secure && !req.headers.host.includes('localhost')) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
