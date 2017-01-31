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
var authentication_service_1 = require('../../services/authentication.service');
var game_service_1 = require('../../services/game.service');
var game_1 = require('../../models/game');
var LobbyTableComponent = (function () {
    function LobbyTableComponent(authenticationService, gameService) {
        this.authenticationService = authenticationService;
        this.gameService = gameService;
        this.isJoinGameDisabled = false;
    }
    LobbyTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameService.updateGame().subscribe(function (response) {
            if (response.gameId == _this.game._id) {
                _this.game.players.push(response.player);
            }
        });
    };
    LobbyTableComponent.prototype.startGame = function () {
        var _this = this;
        this.gameService.updateStateGame(this.authenticationService.user, this.game).subscribe(function (response) {
            _this.gameService.startGame(_this.game);
        });
        this.gameService.sendRefresh();
    };
    LobbyTableComponent.prototype.joinGame = function () {
        var _this = this;
        this.isJoinGameDisabled = true;
        if (this.game.players.length < 4) {
            this.gameService.joinGameBD(this.authenticationService.user, this.game).subscribe(function (response) {
                _this.gameService.joinGame(response, _this.authenticationService.user);
            });
        }
    };
    LobbyTableComponent.prototype.cancelGame = function () {
        var _this = this;
        this.gameService.cancelGameBD(this.authenticationService.user, this.game).subscribe(function (response) {
            _this.gameService.cancelGame(_this.game);
        });
        this.gameService.sendRefresh();
    };
    //ALTERAR!!!
    LobbyTableComponent.prototype.setStartGameDisabled = function () {
        return this.game.players.length > 3 ? false : true;
    };
    LobbyTableComponent.prototype.setJoinGameDisable = function () {
        return this.isJoinGameDisabled || this.game.players.length >= 4;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', game_1.Game)
    ], LobbyTableComponent.prototype, "game", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LobbyTableComponent.prototype, "isOtherGame", void 0);
    LobbyTableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: '[lobby-table]',
            templateUrl: './lobbytable.component.html',
            styleUrls: ['./lobbytable.component.css']
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, game_service_1.GameService])
    ], LobbyTableComponent);
    return LobbyTableComponent;
}());
exports.LobbyTableComponent = LobbyTableComponent;
//# sourceMappingURL=lobbytable.component.js.map