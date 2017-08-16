const data = require('./data.js');
var usersArray = data.users;
usersArray.map((i) =>{
  return `${i.name}`
});
