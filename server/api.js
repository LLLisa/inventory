const express = require('express');
const app = express();
const path = require('path');
const fullText = require('./fullText');

app.use(express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/fullText', (req, res, next) => {
  try {
    res.json(fullText);
  } catch (error) {
    next(error);
  }
});

app.get('/page/:pageNum', (req, res, next) => {
  try {
    res.json(fullText[req.params.pageNum]);
  } catch (error) {
    next(error);
  }
});

app.use('/', (req, res, next) => {
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
