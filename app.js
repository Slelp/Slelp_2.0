const express = require('express');
const hbs = require('hbs');
const pages = require('./routes/pages');
const bodyParser = require('body-parser');
const db = require('./db/query');
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use('/', pages);


app.post('/create', (req, res) => {
      if (req.body.username === '') {
        res.render('index', {
          createError: 'That username is invalid'
        });
      }
      db.checkUser(req.body)
        .then(user => {

          if (!user) {
            db.checkGroup(req.body.group_code)
              .then(group => {
                if (!group) {
                  res.render('index', {
                    createError: 'Group code invalid.'
                  });
                } else {
                  var data = {
                    username: req.body.username,
                    password: req.body.password,
                    group_id: group.id,
                  };
                  db.createUser(data)
                  .then(username => {
                    res.render('index', {
                      createError: 'Account created. Confirm login below.'
                    });
                  })
                }
              });
          } else {
            res.render('index', {
              createError: 'Username is taken'
            });
          }
        });
});

app.post('/main', (req, res) => {
  db.checkLogin(req.body)
  .then(user => {
    if (!user) {
      res.render('index', {
        loginError: 'Username or password is invalid'
      });
    } else {
      db.getInfo(user)
      .then(data => {
        console.log(data);
        var userData = {
          'data': data[0].group_name
        };
      res.render('main', userData);
    });
  }
});
});

      // app.get('/', (req, res) => {
      //   res.render('index', {
      //     title: 'Slelp'
      //   });
      // });

      app.listen(port, () => console.log(`Slelp listening on port:
  ${port}`));
