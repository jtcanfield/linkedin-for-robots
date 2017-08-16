const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustacheExpress = require('mustache-express');
const data = require('./data.js');
const functionfordata = require('./functions.js');
app.engine('mustache', mustacheExpress());
app.use('/nodeapp', express.static(__dirname + '/nodeapp'));
app.set('view engine', 'mustache');
app.set('views', './views');


app.get('/', function (req, res) {
  res.render('index', {
  "peopleList":[
    {"Name": `${functionfordata}`},
]})
})
// {"Name": `${data.users[0].name}`},

app.get("/:dynamic", function (req, res){
  // console.log(req);
  res.send(`You typed ${req.url}`)
});


app.listen(port, function(){
  console.log("Server active on http://localhost:3000/");
});
