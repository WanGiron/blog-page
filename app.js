var express = require('express');
var mysql = require('mysql');
var path = require("path");
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 5005;
// Only for Deployment -HEROKU- Serve up static assets DO NOT TOUCH !!!
if (process.env.NODE_ENV === "production") {
    app.use(express.static("assets"));  
};

//server //
var app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Static folder//
app.use(express.static(__dirname + '/assets'));

//-----------------// ROUTES //-----------------//

// login route //
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/login.html"));
});

// admin route //
app.get("/admin", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/admin.html"));
});

//-----------------------------------------------//


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
        my_blogs: frontPost.my_blogs,
        blog_title: frontPost.blog_title,
        blog_date: frontPost.blog_date,
        blog_image: frontPost.blog_image
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
    console.log("this is the body" + req.body.data);
    var sql = `UPDATE blog_body set my_blogs = '${req.body.data}' WHERE id = ${req.params.id}`; 
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    })
    res.send('Updated!');
});

// Homepage route //
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/home.html"));
});
//server setup //
// app.listen('3000', function () {
//     console.log('listening on port 3000');
// });

app.listen(PORT, function () {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});