const express = require('express');
const hbs = require('hbs');
const pages = require('./routes/pages');
const bodyParser = require('body-parser');

const db = require('./db/query');
// use heroku or local host
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use('/', pages);

// app.get('/', (req, res) => {
//   res.render('index', {
//     title: 'Slelp'
//   });
// });



app.listen(port, () => console.log(`Slelp listening on port:
  ${port}`));
