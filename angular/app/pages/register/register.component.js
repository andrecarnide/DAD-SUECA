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
var authentication_service_1 = require('../../services/authentication.service');
var user_1 = require('../../models/user');
var RegisterComponent = (function () {
    function RegisterComponent(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.user = new user_1.User('', '', '', '', 0, 0, '', '', '', '');
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.isRegisterFailed = false;
        this.authenticationService.register(this.user.name, this.user.username, this.user.email, this.user.password, this.user.avatar).subscribe(function (registered) {
            if (registered) {
                if (registered['message'] === 'This user already exists') {
                    _this.usernameEqual = true;
                }
                else if (registered['message'] === 'This Email already exists') {
                    _this.emailEqual = true;
                }
                else {
                    _this.isRegisterFailed = false;
                    //this.gameService.sendRegisterMessage(registered);
                    _this.router.navigateByUrl('/login');
                    alert('User created successfully!');
                }
            }
            else {
                _this.isRegisterFailed = true;
            }
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-home',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map