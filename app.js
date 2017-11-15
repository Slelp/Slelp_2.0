const express = require('express');
const hbs = require('hbs');
const pages = require('./routes/pages');
const bodyParser = require('body-parser');
const db = require('./db/query');
const port = process.env.PORT || 3000;
const app = express();
const solutions = require('./solutions')
// const indexjs = require('./public/javascript/index.js');

// var theHelp = {
//   id: 0,
//   group_id: 0,
//   group_name: '',
//   qTitle: '',
//   description: '',
//   help_link: '',
//   category_id: 0,
//   category: '',
//   help_user: '',
//   help_readableTime: '',
//   theAnswer: []
// };

var mainData = {
  group_id: 1,
  group_name: 'g64',
  user_id: 3,
  username: 'Kyle',
  helps: [],
  help_id: ''
};

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use('/', pages);

app.post('/', (req, res) => {
  if (req.body.username === '') {
    res.render('index', {createError: 'That username is invalid'});
  }
  db.checkUser(req.body).then(user => {

    if (!user) {
      db.checkGroup(req.body.group_code).then(group => {
        if (!group) {
          res.render('index', {createError: 'Group code invalid.'});
        } else {
          var data = {
            username: req.body.username,
            password: req.body.password,
            group_id: group.id
          };
          db.createUser(data).then(username => {
            res.render('index', {createError: 'Account created. Confirm login below.'});
          }).catch(err => {
            console.log(err);
          });
        }
      });
    } else {
      res.render('index', {createError: 'Username is taken'});
    }
  }).catch(err => {
    console.log(err);
  });
});

// function populateMain(group_id) {
//   return new Promise((resolve, reject) => {
//     console.log("Line 89");
//     db.getHelps(group_id).then(helps => {
//       res.redirect('/main')
//       // while (mainData.helps.length > helps.length) {
//       //   mainData.helps.pop();
//       // }
//       // for (var i = 0; i < helps.length; i++) {
//       //   cleanHelps(helps[i]);
//       // }
//       // return;
//     });
//   })
// }

app.post('/main', (req, res) => {
  db.checkLogin(req.body).then(user => {
    if (!user) {
      res.render('loginError', {loginError: 'Username or password is invalid'});
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
  .then(group=>{
  db.getHelps(mainData.group_id)
  .then(helps=>{
    db.getAnswers(mainData.group_id)
  .then(answers =>
    {
    helps = solutions.mapAnswers(helps, answers)
    data = {
      helps: helps,
      group: group[0],
    }
    // console.log('118: data: ',data);
    res.render('main', data)})
  })
})
})

// function loadHelpsList(helps) {
//   return new Promise((resolve, reject) => {
//     while (mainData.helps.length > helps.length) {
//       mainData.helps.pop();
//     }
//     for (var i = 0; i < helps.length; i++) {
//       cleanHelps(helps[i]);
//     }
//     resolve();
//   })
// }
// function cleanHelps(oneHelp) {
//   var help = {
//     help_id: oneHelp.id,
//     user_id: oneHelp.user_id,
//     username: '',
//     qTitle: oneHelp.title,
//     description: oneHelp.description,
//     solution: 0,
//     category: oneHelp.category_id
//   };
//
//   db.getHelpUser(oneHelp.user_id).then(user => {
//     help.username = user.username;
//     db.getAnswers(help.help_id).then(answer => {
//       if (!answer) {
//         help.solution = 'Solution Needed';
//       } else {
//         help.solution = answer.length;
//       }
//       db.getCategory(oneHelp.category_id).then(cat => {
//         var flag = true;
//         help.category = cat[0].category_name;
//         for (var i = 0; i < mainData.helps.length; i++) {
//           if (mainData.helps[i].qTitle === help.qTitle) {
//             flag = false;
//           }
//         }
//         if (flag) {
//           mainData.helps.push(help);
//         }
//         return;
//       }).catch(err => {
//         console.log(err);
//       });
//     });
//   });
// }

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
      console.log('184: data: ', data);
    })
  })
})
  //   theHelp.username = mainData.username;
  //   theHelp.user_id = mainData.user_id;
  //   theHelp.password = mainData.password;
  //   theHelp.id = help[0].id;
  //   theHelp.group_id = help[0].group_id;
  //   theHelp.qTitle = help[0].title;
  //   theHelp.description = help[0].description;
  //   theHelp.help_link = help[0].link;
  //   theHelp.category_id = help[0].category_id;
  //   theHelp.help_user = help[0].user_id;
  //   theHelp.help_readableTime = help[0].readableTime;
  //   theHelp.help_readableTime = theHelp.help_readableTime.toString().split('T');
  //   theHelp.help_readableTime = theHelp.help_readableTime[0];
  //   db.getUser(theHelp.help_user).then(user => {
  //     theHelp.help_user = user.username;
  //     db.getGroupName(help[0].group_id).then(group => {
  //
  //       theHelp.group_name = group.group_name;
  //       db.getCategory(theHelp.category_id).then(category => {
  //         theHelp.category = category[0].category_name;
  //         db.getAnswers(theHelp.id).then(answer => {
  //           while (theHelp.theAnswer.length > answer.length) {
  //             theHelp.theAnswer.pop();
  //           }
  //           for (var i = 0; i < answer.length; i++) {
  //             getHelpAnswerUser(answer[i]);
  //           }
  //
  //           res.render('qa', theHelp);
  //         });
  //       });
  //     });
  //   });
  // });


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
  db.getAnswerUser(answerData.answer_user).then(user => {
    answerData.answer_user = user[0].username;
    var flag = true;
    for (var i = 0; i < theHelp.theAnswer.length; i++) {
      if (theHelp.theAnswer[i].answer === answerData.answer) {
        flag = false;
      }
    }
    if (flag) {
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
    readableTime: new Date()
  };
  newHelp.readableTime = solutions.fixTime(newHelp.readableTime);
  db.getCategoryId(newHelp.category_id)
  .then(cat_id => {
    newHelp.category_id = cat_id[0].id;
    db.createHelp(newHelp)
    .then(help => {
        res.redirect('/helps');
    })
  }).catch(err => {
    res.send(err);
  });
});

app.post('/createAnswer', (req, res) => {
  console.log(req.body);
  req.body.timestamp = new Date().getTime();
  req.body.readableTime = solutions.fixTime(new Date());
  db.createAnswer(req.body).then(answer => {
    res.redirect('/helps');
  })
})

app.get('/answer/:id', (req, res) => {


  db.getHelpInfo(req.params.id)
  .then(help=>{
    let data = {
      help: help[0],
      user: mainData.user_id,
    }

    console.log("291 data: ",data , mainData);
    res.render('answer', data);

  })
})

app.get('/help', (req, res) => {
  res.render('help', mainData);
});

app.listen(port, () => console.log(`Slelp listening on port:
  ${port}`));
