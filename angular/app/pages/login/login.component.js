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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var user_1 = require('../../models/user');
var authentication_service_1 = require('../../services/authentication.service');
var game_service_1 = require('../../services/game.service');
var LoginComponent = (function () {
    function LoginComponent(authenticationService, router, gameService) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.gameService = gameService;
        this.user = new user_1.User('', '', '', '', 0, 0, '', '', '', '');
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.isLogginFailed = false;
        this.authenticationService.login(this.user.username, this.user.password).subscribe(function (logged) {
            if (logged) {
                _this.isLogginFailed = false;
                _this.gameService.sendLoginMessage(logged);
                sessionStorage.setItem('player', JSON.stringify(logged));
                _this.router.navigateByUrl('/');
            }
            else {
                _this.isLogginFailed = true;
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-home',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, router_1.Router, game_service_1.GameService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map