"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_1 = require("../../models/user");
var authentication_service_1 = require("../../services/authentication.service");
var websocket_service_1 = require("../../services/websocket.service");
var LoginComponent = (function () {
    function LoginComponent(authenticationService, router, webSocketService) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.webSocketService = webSocketService;
        this.user = new user_1.User('', '', '', '', 0, 0, '', '', '', '');
        FB.init({
            appId: '1127781007321022',
            cookie: false,
            // the session
            xfbml: true,
            version: 'v2.8' // use graph api version 2.5
        });
    }
    LoginComponent.prototype.statusChangeCallback = function (resp) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
            console.log('ligado');
            var id = resp.authResponse.userID;
            var accessToken = resp.authResponse.accessToken;
            this.getCurrentUserInfo(id, accessToken);
        }
        else if (resp.status === 'not_authorized') {
            console.log('nao ligado');
        }
        else {
            console.log('outros');
        }
    };
    ;
    LoginComponent.prototype.getCurrentUserInfo = function (id, token) {
        FB.api('/me?fields=id,name,first_name', function (userInfo) {
            var _this = this;
            var name = userInfo.name;
            var id = userInfo.id;
            var first_name = userInfo.first_name;
            console.log(id);
            console.log(first_name);
            console.log(name);
            console.log(token);
            this.authenticationService.loginFace().then(function (r) {
                _this.user = r;
            });
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.isLogginFailed = false;
        this.authenticationService.login(this.user.username, this.user.password).subscribe(function (logged) {
            if (logged) {
                _this.isLogginFailed = false;
                _this.webSocketService.sendLoginMessage(logged);
                _this.router.navigateByUrl('/');
            }
            else {
                _this.isLogginFailed = true;
            }
        });
    };
    LoginComponent.prototype.loginFacebook = function () {
        var _this = this;
        FB.login();
        FB.getLoginStatus(function (response) {
            _this.statusChangeCallback(response);
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-home',
        templateUrl: './login.component.html'
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router, websocket_service_1.WebSocketService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
