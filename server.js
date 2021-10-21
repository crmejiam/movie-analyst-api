// Get our dependencies
var express = require('express');
var app = express();
var mysql = require("mysql");

require('dotenv').config();
var connection = mysql.createConnection({
 host     : process.env.DB_HOST,
 user     : process.env.DB_USER,
 password : process.env.DB_PASS,
 database : process.env.DB_NAME || 'movie_db'
});

connection.connect();

// Prints env variables to see if they have the correct value
console.log("DB_HOST: " + process.env.DB_HOST);
console.log("DB_USER: " + process.env.DB_USER);
console.log("DB_PASS: " + process.env.DB_PASS);

//Testing endpoint
app.get('/', function(req, res){
  var response = [{response : 'hello'}, {code : '200'}]
  res.json(response);
})

// Implement the movies API endpoint
app.get('/movies', function(req, res){
  connection.query('SELECT * FROM movie_db.moviereview', function(err, movies) {
    if (err) throw err;
    res.json(movies);
  });
})

// Implement the reviewers API endpoint
app.get('/reviewers', function(req, res){
  connection.query('SELECT * FROM reviewer', function(err, authors) {
    if (err) throw err;
    res.json(authors);
  });
})

// Implement the publications API endpoint
app.get('/publications', function(req, res){
  connection.query('SELECT * FROM publication', function(err, publications){
    if (err) throw err;
    res.json(publications);
  });
})

// Implement the pending reviews API endpoint
app.get('/pending', function(req, res){
  connection.query('SELECT * FROM pending', function(err, pending){
    if (err) throw err;
    res.json(pending);
  });
})

console.log("server listening through port: "+process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT || 3000);
module.exports = app;
