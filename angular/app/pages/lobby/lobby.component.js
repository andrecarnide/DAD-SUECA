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
var game_service_1 = require('../../services/game.service');
var game_1 = require('../../models/game');
var LobbyComponent = (function () {
    function LobbyComponent(authenticationService, gameService, router) {
        this.authenticationService = authenticationService;
        this.gameService = gameService;
        this.router = router;
        this.myGames = [];
        this.otherGames = [];
        this.game = new game_1.Game('', '', '', '', '', '', '', '', [{}]);
    }
    LobbyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameService.getNewGame().subscribe(function (response) {
            _this.otherGames.push(response);
        });
        this.gameService.getPendingGames(this.authenticationService.user).subscribe(function (response) {
            response.forEach(function (game) {
                if (game.creatorId == _this.authenticationService.user._id) {
                    _this.myGames.push(game);
                }
                else {
                    _this.otherGames.push(game);
                }
            });
        });
        this.gameService.getRefresh().subscribe(function (response) {
            _this.myGames = [];
            _this.otherGames = [];
            _this.refresh();
        });
        this.gameService.getStartGame().subscribe(function (response) {
            _this.gameService.setPrivateGame(response._id);
            _this.router.navigateByUrl('/game/' + response._id);
        });
    };
    LobbyComponent.prototype.createGame = function () {
        var _this = this;
        this.gameService.createNewGame(this.authenticationService.user, this.game).subscribe(function (response) {
            if (response) {
                _this.gameService.createGame(response, _this.authenticationService.user);
                _this.myGames.push(response);
            }
            else {
                console.error('Error. Impossible create game.');
            }
        });
    };
    LobbyComponent.prototype.refresh = function () {
        var _this = this;
        this.gameService.getPendingGames(this.authenticationService.user).subscribe(function (response) {
            _this.myGames = [];
            _this.otherGames = [];
            response.forEach(function (game) {
                if (game.creatorId == _this.authenticationService.user._id) {
                    _this.myGames.push(game);
                }
                else {
                    _this.otherGames.push(game);
                }
            });
        });
    };
    LobbyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-home',
            templateUrl: './lobby.component.html',
            styleUrls: ['./lobby.component.css']
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, game_service_1.GameService, router_1.Router])
    ], LobbyComponent);
    return LobbyComponent;
}());
exports.LobbyComponent = LobbyComponent;
//# sourceMappingURL=lobby.component.js.map