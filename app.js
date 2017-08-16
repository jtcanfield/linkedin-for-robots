const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustacheExpress = require('mustache-express');
const data = require('./data.js');
app.use(express.static(__dirname + '/public'));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.get('/index/', function (req, res) {
  res.render('index', data);
});


app.get('/index/:requestedid', function (req, res) {
  var useridex = req.params.requestedid - 1;
  res.render('profile', data.users[useridex]);
});


app.listen(port, function(){
  console.log("Server active on http://localhost:3000/");
});
