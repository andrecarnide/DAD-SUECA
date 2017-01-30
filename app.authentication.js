"use strict";
var passport = require('passport');
var Authentication = (function () {
    function Authentication() {
        var _this = this;
        this.login = function (request, response, next) {
            var player = request.user;
            response.json(player);
            return next();
        };
        this.logout = function (request, response, next) {
            request.logOut();
            response.json({ msg: 'Logout' });
            return next();
        };
        this.init = function (server, settings) {
            server.post(settings.prefix + 'login', settings.security.passport.authenticate('local', { 'session': false }), _this.login);
            server.post(settings.prefix + 'logout', settings.security.authorize, _this.logout);
            /*
            server.get(settings.prefix + 'auth/facebook', settings.security.passport.authenticate('facebook', {scope: 'email'}));
            server.get(settings.prefix + 'auth/facebook/callback', settings.security.passport.authenticate('facebook', {successRedirect : '/profile', failureRedirect : '/'}));
    */
            /*app.get('auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    
            // handle the callback after facebook has authenticated the user
            app.get('auth/facebook/callback',
                passport.authenticate('facebook', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
                }));*/
            console.log("Authentication routes registered");
        };
    }
    return Authentication;
}());
exports.Authentication = Authentication;
