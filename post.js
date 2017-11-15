const http = require('http');

function post(title) {
  let data = {
    'title': title,
  }

  var options = {
    header: {
      "content-type": 'application/x-www-form-urlencoded'
    },
    json: true,
    host: 'https://hooks.slack.com',
    port: 80,
    path: '/services/T1T555TL0/B7NM8J2HJ/KpV4lGwjMn7wEjHFdOJhE1aO',
    method: 'POST',
  };

  var req = http.request(options, function(res) {
    res.on('data', function(chunk) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write(JSON.stringify(data));
  req.end();
}
module.exports = {
  post,
}
