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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('http://localhost:7777/api/v1/login', { username: username, password: password })
            .map(function (response) {
            _this.user = response.json();
            return _this.user;
        })
            .catch(function (exception) {
            console.log(exception);
            return Rx_1.Observable.of(null);
        });
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        var options = this.buildHeaders();
        return this.http.post('http://localhost:7777/api/v1/logout', {}, options)
            .map(function (response) {
            response.json();
            _this.user = null;
            sessionStorage.clear();
            return _this.user;
        })
            .catch(function (exception) {
            console.log(exception);
            return Rx_1.Observable.throw(exception);
        });
    };
    AuthenticationService.prototype.register = function (name, username, email, password, avatar) {
        return this.http.post('http://localhost:7777/api/v1/register', {
            name: name,
            username: username,
            email: email,
            password: password,
            avatar: avatar
        })
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return Rx_1.Observable.throw(error);
        });
    };
    AuthenticationService.prototype.buildHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'bearer ' + this.user.token);
        headers.append('Content-Type', 'application/json');
        return new http_1.RequestOptions({ headers: headers });
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        if (this.user == null)
            return false;
        return true;
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map