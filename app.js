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
searchSubmit();

function searchSubmit(){
  let usersearch = $("#textinput").val()
  fetch("https://tiy-learn-content.s3.amazonaws.com/36d3402e-data.js")
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log("Fetch Error: ", err);
  });
}


/*


function searchSubmit(){
  let usersearch = $("#textinput").val()
  fetch("http://recipepuppyproxy.herokuapp.com/api/?q=" + usersearch)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log(response.status);
          return;
        }
        response.json().then(function(data) {
          let resultsArray = data.results;
          let parentbody = document.querySelector('#searchappender');
          parentbody.innerHTML = "";
          resultsArray.map((i) =>{
            console.log(i);
            let parentDiv = document.createElement('div');
            parentbody.appendChild(parentDiv);
            let backgroundimg = document.createElement('p');
            if (i.thumbnail !== ""){
              backgroundimg.setAttribute("style", "background-image: url("+i.thumbnail+");");
            }
            let spantext = document.createElement('a');
            spantext.innerHTML = i.title + "<br>Ingredients: " + i.ingredients + "<br><br><br>";
            spantext.setAttribute("href", i.href);
            parentDiv.appendChild(backgroundimg);
            parentDiv.appendChild(spantext);
          })
        });
      }
    )
    .catch(function(err) {
      console.log("Fetch Error: ", err);
    });
}


*/
