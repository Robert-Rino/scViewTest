var request = require('request');

console.log('Hello from IronWorker!');
request('http://104.155.227.109:8080/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); // Show the HTML for the Google homepage.
  }
});

// When you're ready press 'Run code ...'
