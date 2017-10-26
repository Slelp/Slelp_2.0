const express = require('express');
const hbs = require('hbs');
const pages = require('./routes/pages');
const bodyParser = require('body-parser');
const db = require('./db/query');
const port = process.env.PORT || 3000;
const app = express();

var theHelp = {
  id: 0,
  group_id: 0,
  group_name: '',
  qTitle: '',
  description: '',
  help_link: '',
  category_id: 0,
  category: '',
  help_user: '',
  help_readableTime: '',
  theAnswer: []
  // answer_id: 0,
  // answer_user: '',
  // answer: '',
  // answer_link_1: '',
  // answer_link_2: '',
  // answer_timestamp: '',
  // answer_readableTime: '',
};

var mainData = {
  // group_id: 0,
  // group_name: '',
  // user_id: 0,
  // username: '',
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


app.post('/', (req, res) => {
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

function poopulateMain(group_id) {

  db.getHelps(group_id)
    .then(helps => {
      while (mainData.helps.length > helps.length) {
        mainData.helps.pop();
      }
      for (var i = 0; i < helps.length; i++) {
        cleanHelps(helps[i]);
      }
      // console.log(mainData);
      return;

    });
}

app.post('/main', (req, res) => {
  console.log(req);
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
        mainData.password = user.password;
        db.getGroupName(user.group_id)
          .then(group => {
            mainData.group_name = group.group_name;
            db.getHelps(group.id)
              .then(helps => {
                while (mainData.helps.length > helps.length) {
                  mainData.helps.pop();
                }
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
  // console.log(`151 : ${help}`);
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
              // console.log(cat);
              var flag = true;
              help.category = cat[0].category_name;
              for (var i = 0; i < mainData.helps.length; i++) {
                if (mainData.helps[i].qTitle === help.qTitle) {
                  flag = false;
                }
              }
              if (flag) {
                mainData.helps.push(help);
                }
              return;
            })
            .catch(err => {
              console.log(err);
            });
        });
    });
}

app.post('/qa/:id', (req, res) => {
  db.getHelpInfo(req.params.id)
    .then(help => {
      theHelp.username =  mainData.username;
      theHelp.user_id =  mainData.user_id;
      theHelp.password =  mainData.password;
      theHelp.id = help[0].id;
      theHelp.group_id = help[0].group_id;
      theHelp.qTitle = help[0].title;
      theHelp.description = help[0].description;
      theHelp.help_link = help[0].link;
      theHelp.category_id = help[0].category_id;
      theHelp.help_user = help[0].user_id;
      theHelp.help_readableTime = help[0].readableTime;
      theHelp.help_readableTime = theHelp.help_readableTime.toString().split('T');
      theHelp.help_readableTime = theHelp.help_readableTime[0];
      console.log(req.body.category);
      db.getUser(theHelp.help_user)
        .then(user => {
          theHelp.help_user = user.username;
          db.getGroupName(help[0].group_id)
            .then(group => {

              theHelp.group_name = group.group_name;
              db.getCategory(theHelp.category_id)
                .then(category => {
                  theHelp.category = category[0].category_name;
                  db.getAnswers(theHelp.id)
                    .then(answer => {
                      while(theHelp.theAnswer.length > answer.length){
                        theHelp.theAnswer.pop();
                      }
                      for (var i = 0; i < answer.length; i++) {
                        getHelpAnswerUser(answer[i]);
                      }

                      res.render('qa', theHelp);
                    });
                });
            });
        });
    });
});

function getHelpAnswerUser(answer) {
  var answerData = {
    answer_id: answer.id,
    answer: answer.answer,
    answer_link_1: answer.link_1,
    answer_link_2: answer.link_2,
    answer_timestamp: answer.timestamp,
    answer_readableTime: answer.readableTime,
    answer_user: answer.user_id
  }
  db.getAnswerUser(answerData.answer_user)
    .then(user => {
      answerData.answer_user = user[0].username;
      var flag = true;
      for (var i = 0; i < theHelp.theAnswer.length; i++) {
        if(theHelp.theAnswer[i].answer === answerData.answer){
          flag = false;
        }
      }
      if (flag){
        theHelp.theAnswer.push(answerData);
      }

      return;
    });
}

app.post('/createHelp', (req, res) => {
  var newHelp = {
    group_id: mainData.group_id,
    title: req.body.title,
    description: req.body.body,
    link: req.body.link,
    user_id: req.body.user_id,
    category_id: req.body.category,
    timestamp: new Date().getTime(),
    readableTime: new Date(),
  };
  newHelp.readableTime = newHelp.readableTime.toString().split('T');
  newHelp.readableTime = newHelp.readableTime[0];
  console.log(req.body.category);
  db.getCategoryId(newHelp.category_id)
    .then(cat_id => {
      console.log(cat_id);
      newHelp.category_id = cat_id[0].id;
      db.createHelp(newHelp)
        .then(help => {
          poopulateMain(mainData.group_id);
          res.render('main', mainData);
        })

    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/createAnswer', (req,res)=> {
  db.createAnswer(req.body)
  .then(answer => {
    res.render('main', mainData);
  })
})

app.get('/answer', (req, res) => {
  res.render('answer', theHelp);
})

app.get('/help', (req, res) => {
  res.render('help', mainData);
});

app.listen(port, () => console.log(`Slelp listening on port:
  ${port}`));
