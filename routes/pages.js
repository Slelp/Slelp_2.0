const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Slelp'
  });
});

router.get('/main', (req, res) => {
  res.render('main');
});

router.get('/help', (req, res) => {
  res.render('help');
});

router.get('/answer', (req, res) => {
  res.render('answer');
});

router.get('/qa', (req, res) => {
  res.render('qa');
});

module.exports = router;
