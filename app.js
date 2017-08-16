const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.use('/nodeapp', express.static(__dirname + '/nodeapp'));
app.set('view engine', 'mustache');
app.set('views', './views');


app.get('/', function (req, res) {
  res.render('index', {
  "peopleList":[
  {"text": "Learn Node basics"},
  {"text": "Learn Express basics"},
  {"text": "Learn Mustache"},
  {"text": "Learn HTML forms with Express"},
  {"text": "Learn about authentication"},
  {"text": "Learn how to connect to PostgreSQL"},
  {"text": "Learn how to create databases"},
  {"text": "Learn SQL"},
  {"text": "Learn how to connect to PostgreSQL from Node"},
  {"text": "Learn how to use Sequelize"}
]})
})
console.log();

app.get("/:dynamic", function (req, res){
  // console.log(req);
  res.send(`You typed ${req.url}`)
});


app.listen(port, function(){
  console.log("Server active on http://localhost:3000/");
});
