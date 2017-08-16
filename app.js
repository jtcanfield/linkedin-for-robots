const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustacheExpress = require('mustache-express');
const data = require('./data.js');
app.engine('mustache', mustacheExpress());
// app.use('/nodeapp', express.static(__dirname + '/nodeapp'));
app.set('view engine', 'mustache');
app.set('views', './views');

app.get('/index/', function (req, res) {
  res.render('index', data);
});

app.get("/:dynamic", function (req, res){
  console.log(req.params.dynamic);

  let thisUser = data.users.filter(function(obj){
    return obj.username == req.params.dynamic;
  })

  var requestid = `${req.params.dynamic}`
  // var request = data.req
  res.send(thisUser);
  // res.send(`You typed ${requestid} but that is not a page`)
});


app.listen(port, function(){
  console.log("Server active on http://localhost:3000/");
});
