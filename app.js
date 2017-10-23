const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const db = require('./db/query');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.listen(port, () => console.log(`Slelp listening on port:
  ${port}`));
