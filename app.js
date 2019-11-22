var express = require('express');
var mysql = require('mysql');
var path = require("path");
var bodyParser = require('body-parser');

//server //
var app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Static folder//
app.use(express.static(__dirname + '/assets'));

// ROUTES //

// Homepage route //
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/home.html"));
});

// login route //
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/login.html"));
});

// admin route //
app.get("/admin", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/admin.html"));
});





//TODO: create connection to database//
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pollito#2',
    database: 'blog'
});

db.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('database connected!');
});



//TODO: get all posts from db //
app.get('/gettheposts', function (req, res) {
    var sql = 'SELECT * FROM blog_body';
    db.query(sql, function (err, results) {
        if (err) throw err;
        console.log(results)
        res.json(results);
    });
});

// to insert posts to db // 
app.post('/postblog', function(req, res){
    var frontPost = req.body;
    console.log("this is the body" + frontPost);
    // object to be stored in db
    var post = {
        my_blogs: frontPost.data
    }
    var sql = 'INSERT INTO blog_body SET ?';
    db.query(sql, post, function (err, result) {
        if (err) throw err;
        console.log(result);
    })
    res.json(frontPost);
});

// to insert posts to db // 
app.post('/updatedpost/:id', function(req, res){
    // var frontPost = req.body;
    console.log("this is the body" + req.body.data);
    // object to be stored in db
    // var post = {
    //     my_blogs: frontPost.data
    // }
    var sql = `UPDATE blog_body set my_blogs = '${req.body.data}' WHERE id = ${req.params.id}`; 
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    })
    res.send('Updated!');
});


//server setup //
app.listen('3000', function () {
    console.log('listening on port 3000');
});