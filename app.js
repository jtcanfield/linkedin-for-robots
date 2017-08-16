const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustacheExpress = require('mustache-express');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.use('/nodeapp', express.static(__dirname + '/nodeapp'));
app.set('view engine', 'mustache');
app.set('views', './views');


//on homepage, do this (it cascades, so whatever comes last is on top)
app.get('/', function (req, res) {
  res.render('index', { userName: 'Sam' })
})
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname + '/index.mustache'));
});



app.get("/:dynamic", function (req, res){
  // console.log(req);
  res.send(`You typed ${req.url}`)
});


app.listen(port, function(){
  console.log("Server active on http://localhost:3000/");
});
