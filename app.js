const express = require('express');
const hbs = require('hbs');
const pages = require('./routes/pages');
const bodyParser = require('body-parser');
const db = require('./db/query');
const port = process.env.PORT || 3000;
const app = express();
const solutions = require('./solutions')
const post = require('./post');
const methodOverride = require('method-override')

// var mainData = {
//   group_id: 0,
//   group_name: '',
//   user_id: 0,
//   username: '',
//   helps: [],
//   help_id: ''
// };
var mainData = {
  group_id: 1,
  group_name: 'g64',
  user_id: 3,
  username: 'Kyle',
  helps: [],
  help_id: ''
};


app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use('/', pages);

app.post('/', (req, res) => {
  if (req.body.username === '') {
    res.render('index', {
      createError: 'That username is invalid'
    });
  }
  db.checkUser(req.body).then(user => {

    if (!user) {
      db.checkGroup(req.body.group_code).then(group => {
        if (!group) {
          res.render('index', {
            createError: 'Group code invalid.'
          });
        } else {
          var data = {
            username: req.body.username,
            password: req.body.password,
            group_id: group.id
          };
          db.createUser(data).then(username => {
            res.render('index', {
              createError: 'Account created. Confirm login below.'
            });
          }).catch(err => {
            console.error(err);
          });
        }
      });
    } else {
      res.render('index', {
        createError: 'Username is taken'
      });
    }
  }).catch(err => {
    console.error(err);
  });
});


app.post('/main', (req, res) => {
  db.checkLogin(req.body).then(user => {
    if (!user) {
      res.render('loginError', {
        loginError: 'Username or password is invalid'
      });
    } else {
      mainData.user_id = user.id;
      mainData.username = user.username;
      mainData.group_id = user.group_id;
      mainData.password = user.password;
      db.getGroupName(user.group_id).then(group => {
        mainData.group_name = group.group_name;
        db.getHelps(group.id).then(nothing => {
          res.redirect('/helps');
        })
      });
    }
  });
});

app.get('/helps', (req, res) => {
  db.getUserGroupInfo(mainData.user_id)
    .then(group => {
      db.getHelps(mainData.group_id)
        .then(helps => {
          db.getAnswers(mainData.group_id)
            .then(answers => {
              helps = solutions.mapAnswers(helps, answers)
              data = {
                helps: helps,
                group: group[0],
              }
              res.render('main', data)
            })
        })
    })
})

app.get('/qa/:id', (req, res) => {
  db.getHelpInfo(req.params.id).then(help => {
    db.getHelpAnswers(req.params.id).then(answers => {
      for (var i = 0; i < answers.length; i++) {
        answers[i].readableTime = solutions.fixTime(answers[i].readableTime);
      }
      help[0].readableTime = solutions.fixTime(help[0].readableTime);
      let data = {
        question: help[0],
        answers: answers,
        group_name: mainData.group_name,
      }
      res.render('qa', data)
    })
  })
})

app.post('/createHelp', (req, res) => {
  var newHelp = {
    group_id: mainData.group_id,
    title: req.body.title,
    description: req.body.body,
    link: req.body.link,
    user_id: req.body.user_id,
    category_id: req.body.category,
    timestamp: new Date().getTime(),
    readableTime: new Date()
  };
  newHelp.readableTime = solutions.fixTime(newHelp.readableTime);
  db.getCategoryId(newHelp.category_id)
    .then(cat_id => {
      newHelp.category_id = cat_id[0].id;
      db.createHelp(newHelp)
        .then(help => {
          // post.post(newHelp.title)
          res.redirect('/helps');
        })
    }).catch(err => {
      res.send(err);
    });
});

app.post('/createAnswer', (req, res) => {
  req.body.timestamp = new Date().getTime();
  req.body.readableTime = solutions.fixTime(new Date());
  db.createAnswer(req.body).then(answer => {
    res.redirect('/helps');
  })
})

app.get('/answer/:id', (req, res) => {
  db.getHelpInfo(req.params.id)
    .then(help => {
      let data = {
        help: help[0],
        user: mainData.user_id,
      }
      res.render('answer', data);
    })
})

app.get('/help', (req, res) => {
  res.render('help', mainData);
});

app.get('/edit/q/:id', (req, res) => {
  db.getHelpInfoCat(req.params.id)
    .then(helps => {
      let data = {
        question: helps[0],
        group_name: mainData.group_name,
      }
      console.log(data);
      res.render('qedit', data)
    })
})

app.put('/edit/q/:id', (req, res) => {
  console.log('200: req.body:', req.body)
  req.body.timestamp = new Date().getTime()
  req.body.readableTime = solutions.fixTime(new Date())
  req.body.group_id = mainData.group_id
  db.getCategoryId(req.body.category_id)
    .then(catId => {
      req.body.category_id = catId[0].id
      console.log(req.body);
      db.editHelp(req.params.id, req.body)
        .then(data => {
          res.redirect('/helps')
        })
    })
})

app.listen(port, () => console.log(`Slelp listening on port:
  ${port}`));
