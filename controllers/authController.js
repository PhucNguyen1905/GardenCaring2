const passport = require('passport');
const userModel = require('../models/userModel');
// View Login page
exports.viewLogin = (req, res) => {
    res.render('login');
}
// POST Login
exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/login',
        failureFlash: false
    })(req, res, next);
}

// GET logout
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
}

// View Register page
exports.viewRegister = (req, res) => {
    res.render('register');
}

// POST register
exports.register = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let phone = req.body.phone;
    let address = req.body.address;
    let adaname = req.body.adaname;
    let adakey = req.body.adakey;

    userModel.insertUser(fname, lname, username, password, phone, address, adaname, adakey);
    res.redirect('/login');
}
