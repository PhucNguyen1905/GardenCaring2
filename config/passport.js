const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/userModel');

module.exports = function (passport) {
    passport.use(new LocalStrategy(function (username, password, done) {
        (async () => {
            try {
                const users = await db.getUserByEmail(username);
                if (users.length == 0)
                    return done(null, false, { message: 'No user found!' });
                if (password == users[0].PASSWORD) {
                    return done(null, users[0])
                } else {
                    return done(null, false, { message: 'Wrong password' });
                }


            } catch (err) {
                console.log("Error!", err);
            }
        })()
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.GMAIL);
    })

    passport.deserializeUser(function (gmail, done) {
        (async () => {
            try {
                const users = await db.getUserByEmail(gmail);
                if (users.length != 0) {
                    done(null, users[0]);
                }
            } catch (err) {
                console.log("Error!", err);
            }
        })()
    })


}