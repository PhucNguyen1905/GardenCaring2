const passport = require('passport');

// View Login page
exports.viewLogin = (req, res) => {
    res.render('login');
}
// POST Login
exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
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
