var express = require('express');
var router = express.Router();
var path = require("path");
var bcrypt = require('bcryptjs');
var passport = require('passport');

var User = require('../models/Users');

//Log in //
// router.get('/login', (req, res)=>res.send('Login'));
router.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../assets/login.html"));
});

// Register user //
// router.get("/register", function (req, res) {
//     res.sendFile(path.join(__dirname, "../assets/register.html"));
// });


//Register
router.post('/register', (req, res) => {
    console.log(req.body);
    var { name, email, password } = req.body;
    // var errs = [];

    // validations fields //
    if ( !name || !email || !password){
        alert('Fill out all entries')
        res.redirect('/users/register');


    }

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                alert('User already registered');
            }
            else {
                var newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });
                console.log(newUser);
                //hash password //
                bcrypt.genSalt(12, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    // password to hash //
                    newUser.password = hash;
                    //save user//
                    newUser.save()
                        .then(user => {
                            //req.flash('succes_msg', 'You are registered!');
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                }))

            }
        });
});

//log in handle //
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/notFound.html',
        failureFlash: false
    })(req, res, next);
})

// logout //
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
})

module.exports = router;
