const express = require('express');
const app = express();
const port = 3000;
const mustacheExpress = require('mustache-express');
const data = require('./data.js');
const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdbNAME';


// renders all data on the /index page
app.get('/index/', function (req, res) {
  res.render('index', data);
});

//dynamically gets whats type in after index/, assigns it to username from req.params, and filters thru the users to find which one has that username
app.get("/index/:username", function (req, res) {
 let thisUser = data.users.filter(function( obj ) {
    return obj.username == req.params.username;
  });
    res.render('profile',thisUser[0])
});


app.get('/', function (req, res) {
  res.redirect("/index");
});

app.listen(port, function(){
  console.log("Server active on http://localhost:3000/");
});

app.use('/searchavailforhire', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robo = db.collection("robots");
    robo.find({job:null}).toArray(function (err, docs) {
      res.render("index", {users: docs})
    })
  })
})
app.use('/searchwithjobs', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robo = db.collection('robots');
    robo.find({job:{$ne: null}}).toArray(function (err, docs) {
      res.render("index", {users: docs})
    })
  })
})
app.use('/searchname', function (req, res) {
  var searched = req.body.namesearch;
  MongoClient.connect(mongoURL, function (err, db) {
    const robo = db.collection('robots');
    robo.find({name:searched}).toArray(function (err, docs) {
      res.render("index", {users: docs})
    })
  })
})

// Use connect method to connect to the server
MongoClient.connect(mongoURL, function(err, db) {
  console.log("Connected successfully to server at " + mongoURL);
  db.close();
});
