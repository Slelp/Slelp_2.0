// loop through helps
// for each help we want to check it against each answer if the help_id = the helps in answers then we need to push the new key into helps called answers
// answers is going to be an array
// push the answers that match

function mapAnswers(helps, answers) {
  for (var i = 0; i < helps.length; i++) {
    helps[i].answers = [];
    for (var j = 0; j < answers.length; j++) {
      if (helps[i].help_id === answers[j].help_id) {
        helps[i].answers.push(answers[j])
      }
    }
    if (helps[i].answers.length > 0) {
      helps[i].answersLength = helps[i].answers.length
    } else {
      helps[i].answersLength = 'NEEDED!!!!!!!!'
    }

  }
  return helps
}

function fixTime(time) {
  time = time.toString().split(':')
  time = time[0] + ':' + time[1];
  return time;
}

module.exports = {
  mapAnswers,
  fixTime,
}
