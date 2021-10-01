// Get our dependencies
var express = require('express');
var app = express();
var mysql = require("mysql");
var connection = mysql.createConnection({
 host     : process.env.DB_HOST || 'mysql-test.cxrpknmq0hfi.us-west-2.rds.amazonaws.com',
 user     : process.env.DB_USER || 'applicationuser',
 password : process.env.DB_PASS || 'applicationuser',
 database : process.env.DB_NAME || 'movie_db'
});

connection.connect();

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
  var pending = [
    {title : 'Superman: Homecoming', release: '2017', score: 10, reviewer: 'Chris Harris', publication: 'International Movie Critic'},
    {title : 'Wonder Woman', release: '2017', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
    {title : 'Doctor Strange', release : '2016', score: 7, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'}
  ]
  res.json(pending);
})
console.log("server listening through port: "+process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT || 3000);
module.exports = app;
