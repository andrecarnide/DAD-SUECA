import {HandlerSettings} from './handler.settings';
const passport = require('passport');

export class Authentication{
   
    public login = (request: any, response: any, next: any) => {
        let player = request.user;
        response.json(player);
        return next();
    }

    public logout = (request: any, response: any, next: any) => {
        request.logOut();
        response.json({msg: 'Logout'});
        return next();
    }  

    public init = (server: any, settings: HandlerSettings) => {
        server.post(settings.prefix + 'login', settings.security.passport.authenticate('local', {'session':false}), this.login);
        server.post(settings.prefix + 'logout', settings.security.authorize, this.logout);
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
    }  
} 

