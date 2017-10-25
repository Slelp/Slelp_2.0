const express = require('express');
const hbs = require('hbs');
const pages = require('./routes/pages');
const bodyParser = require('body-parser');
const db = require('./db/query');
const port = process.env.PORT || 3000;
const app = express();

var mainData = {
  group_id: 0,
  group_name: '',
  user_id: 0,
  username: '',
  helps: []
};

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
                .catch(err => {
                  console.log(err);
                });
            }
          });
      } else {
        res.render('index', {
          createError: 'Username is taken'
        });
      }
    })
    .catch(err => {
      console.log(err);
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

        mainData.user_id = user.id;
        mainData.username = user.username;
        mainData.group_id = user.group_id;
        db.getGroupName(user.group_id)
          .then(group => {
            mainData.group_name = group.group_name;
            db.getHelps(group.id)
              .then(helps => {
                for (var i = 0; i < helps.length; i++) {
                  cleanHelps(helps[i]);
                }
                console.log(mainData);
                res.render('main', mainData);
              });
          });
      }
    });
});

function cleanHelps(oneHelp) {
  var help = {
    help_id: oneHelp.id,
    helpUser: oneHelp.user_id,
    qTitle: oneHelp.title,
    description: oneHelp.description,
    solution: 0,
    category: oneHelp.category_id
  };
  db.getHelpUser(oneHelp.user_id)
    .then(username => {
      help.helpUser = username.username;
      db.getAnswers(help.help_id)
        .then(answer => {
          if (!answer) {
            help.solution = 'Solution Needed';
          } else {
            help.solution = answer.length;
          }
          db.getCategory(oneHelp.category_id)
            .then(cat => {
              help.category = cat[0].category_name;
              mainData.helps.push(help);
              return;
            });
        });
    });
}

app.listen(port, () => console.log(`Slelp listening on port:
  ${port}`));
