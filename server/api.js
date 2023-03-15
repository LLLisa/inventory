const express = require('express');
const app = express();
const path = require('path');
const fullText = require('./fullText');

app.use(express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res, next) => {
  try {
    res.sendFile('../public/index.html');
  } catch (error) {
    next(error);
  }
});

app.get('/foo', (req, res, next) => {
  res.json({ foo: 'bar' });
});

app.get('/fullText', (req, res, next) => {
  try {
    res.json(fullText);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
