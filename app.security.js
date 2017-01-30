"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var sha1 = require('sha1');
var User = require('../angular/app/models/user');
var app_database_1 = require('./app.database');
var Security = (function () {
    function Security() {
        this.passport = passport;
        this.initMiddleware = function (server) {
            server.use(passport.initialize());
        };
        this.authorize = this.passport.authenticate('bearer', { session: false });
    }
    return Security;
}());
exports.Security = Security;
var validPassword = function (player, password) {
    return sha1(password) === player.passwordHash;
};
passport.use(new LocalStrategy(function (username, password, done) {
    app_database_1.databaseConnection.db.collection('players').findOne({
        username: username
    }).then(function (player) {
        if (player === null) {
            return done(null, false, {
                message: 'Incorrect credentials.'
            });
        }
        if (!validPassword(player, password)) {
            return done(null, false, {
                message: 'Incorrect credentials.'
            });
        }
        player.token = sha1(player.username + Date.now());
        app_database_1.databaseConnection.db.collection('players')
            .updateOne({ _id: player._id }, { $set: { token: player.token } })
            .then(function (r) { return r.modifiedCount !== 1 ? done(null, false) : done(null, player); })
            .catch(function (err) { return done(err); });
    }).catch(function (err) { return done(err); });
}));
passport.use(new BearerStrategy(function (token, done) {
    app_database_1.databaseConnection.db.collection('players')
        .findOne({ token: token })
        .then(function (user) { return user ? done(null, user, { scope: 'all' }) : done(null, false); })
        .catch(function (err) { return done(err); });
}));
// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
passport.use(new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID: '1127781007321022',
    clientSecret: 'b10afae15461ce9b8a34e36f6dc1b1b0',
    callbackURL: 'http://localhost:7777/auth/facebook/callback'
}, 
// facebook will send back the token and profile
// facebook will send back the token and profile
function (token, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(function () {
        console.log('ENTROU');
        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id': profile.id }, function (err, user) {
            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
                return done(err);
            // if the user is found, then log them in
            if (user) {
                return done(null, user); // user found, return that user
            }
            else {
                // if there is no user found with that facebook id, create them
                var newUser = new User();
                // set all of the facebook information in our user model
                newUser.facebook.id = profile.id; // set the users facebook id
                newUser.facebook.token = token; // we will save the token that facebook provides to the user
                newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                // save our user to the database
                newUser.save(function (err) {
                    if (err)
                        throw err;
                    // if successful, return the new user
                    return done(null, newUser);
                });
            }
        });
    });
}));
