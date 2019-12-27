var express = require('express');
var mysql = require('mysql');
var path = require("path");
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');



var PORT = process.env.PORT || 80;
// Only for Deployment -HEROKU- Serve up static assets DO NOT TOUCH !!!
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("/assets"));
// };

// Server //
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Static folder//
app.use(express.static(__dirname + '/assets'));

//passport config//
require('./config/passport')(passport);
//express session//
app.use(session({
    secret: 'chocobo',
    resave: true,
    saveUninitialized: true
}));

//Connect to flash//

// app.use(flash());

// app.get('/', function (req, res) {
//     req.flash('Welcome', 'message testin with flash' );
//     res.render('/home.html', {
//       title: 'Home'
//     })
//   });
// app.use(session()); // session middleware
// app.use(require('flash')());
 
// app.use(function (req, res) {
//   // flash a message
//   req.flash('info', 'hello!');
//   next();
// })

// //Global vars//
// app.use((req, res, next)=>{
//     res.locals.success_msg = req.flash('succes_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// })



// Passport middleware//
app.use(passport.initialize());
app.use(passport.session());

// Users routes //
app.use('/users', require('./routes/users'));


//-----------------// ROUTES //-----------------//
// Homepage route //
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/home.html"));
});

// Admin route //
app.get("/admin", checkAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "/assets/admin.html"));
});
//-----------------------------------------------//


//TODO: create connection to Db MongoDb //
var mdb = require('./config/keys').MongoURI;
mongoose.connect(mdb, { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected'))
    .catch(err => console.log(err));

//TODO: create connection to database SQL Local //
// var db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'blog'
// });

//TODO: create connection Deployment //
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nuevavida7',
    database: 'blog'
});

// TODO: create connection to database SQL Heroku //
// var db = mysql.createConnection({
//     host: 'g8mh6ge01lu2z3n1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//     user: 'im52xdsiscbobsda',
//     password: 'o9x74h3o2ux29vnu',
//     database: 'j03vt1ym0mqfz9jv'
// });

db.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('database connected!');
});


// -------------------- MySQL ----------------------------------//
//TODO: get all posts from db //
app.get('/gettheposts', function (req, res) {
    var sql = 'SELECT * FROM blog_body';
    db.query(sql, function (err, results) {
        if (err) throw err;
        // console.log(results)
        res.json(results);
    });
});

// to insert posts to db // 
app.post('/postblog', function (req, res) {
    var frontPost = req.body;
    var post = {
        my_blogs: frontPost.my_blogs,
        blog_title: frontPost.blog_title,
        blog_date: frontPost.blog_date,
        blog_image: frontPost.blog_image
    }
    var sql = 'INSERT INTO blog_body SET ?';
    db.query(sql, post, function (err, result) {
        if (err) throw err;
        // console.log(result);
    })
    res.redirect('/admin');
    // res.json(frontPost);
});

// to insert posts to db with form method // 
// app.post('/postblog', function (req, res) {
//     console.log(req.body);
//     var { my_blogs, blog_title, blog_date, blog_image } = req.body;
//     // object to be stored in db
//     var post = {
//         my_blogs: my_blogs,
//         blog_title: blog_title,
//         blog_date: blog_date, 
//         blog_image: blog_image
//     }
//     var sql = 'INSERT INTO blog_body SET ?';
//     db.query(sql, post, function (err, result) {
//         if (err) throw err;
//         // console.log(result);
//     })
//     res.json('done');
// });

// to insert updated posts to db // 
app.post('/updatedpost/:id', function (req, res) {
    var frontPost = req.body;
    var post = {
        my_blogs: frontPost.my_blogs,
        blog_title: frontPost.blog_title,
        blog_date: frontPost.blog_date,
        blog_image: frontPost.blog_image
    };

    var sql = `UPDATE blog_body SET ? WHERE id = ${req.params.id}`;
    db.query(sql, post, function (err, result) {
        if (err) throw err;
        // console.log(result);
    })
    res.send('Updated!');
});

// to delete posts to db // 
app.delete('/deletepost/:id', function (req, res) {
    var sql = `DELETE FROM blog_body WHERE id = ${req.params.id}`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        // console.log(result);
    })
    res.send('Updated!');
});

// to get one post from database for users // 
app.post('/user/more-info/:value', function (req, res) {
    // console.log("this is the body" + req.params.value);
    var sql = `SELECT * FROM blog_body WHERE id = ${req.params.value}`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        // console.log("this is my result"+JSON.stringify(result));
        res.json(result);
    })       
});

//----------------------------------------------------------------//

// TODO: to authenticate admin page //
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    };
    res.redirect('/users/login');
};

// server //
app.listen(PORT, function () {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT, PORT);
});
