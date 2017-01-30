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
var authentication_service_1 = require("../../services/authentication.service");
var websocket_service_1 = require("../../services/websocket.service");
var game_1 = require("../../models/game");
var LobbyTableComponent = (function () {
    function LobbyTableComponent(authenticationService, webSocketService) {
        this.authenticationService = authenticationService;
        this.webSocketService = webSocketService;
        this.isJoinGameDisabled = false;
    }
    LobbyTableComponent.prototype.ngOnInit = function () {
        this.updateGame();
    };
    LobbyTableComponent.prototype.updateGame = function () {
        var _this = this;
        this.webSocketService.updateGame().subscribe(function (response) {
            if (response.gameId == _this.game._id) {
                _this.game.players.push(response.player);
            }
        });
    };
    LobbyTableComponent.prototype.startGame = function () {
        var _this = this;
        this.webSocketService.updateStateGame(this.authenticationService.user, this.game).subscribe(function (response) {
            _this.webSocketService.startGame(_this.game);
        });
        this.webSocketService.sendRefresh();
    };
    LobbyTableComponent.prototype.joinGame = function () {
        var _this = this;
        this.isJoinGameDisabled = true;
        if (this.game.players.length < 4) {
            this.webSocketService.joinGameBD(this.authenticationService.user, this.game).subscribe(function (response) {
                var player = { player: _this.authenticationService.user._id, username: _this.authenticationService.user.username, score: 0 };
                _this.webSocketService.joinGame(response, player);
            });
        }
    };
    LobbyTableComponent.prototype.cancelGame = function () {
        var _this = this;
        this.webSocketService.cancelGameBD(this.authenticationService.user, this.game).subscribe(function (response) {
            _this.webSocketService.cancelGame(_this.game);
        });
        this.webSocketService.sendRefresh();
    };
    //ALTERAR!!!
    LobbyTableComponent.prototype.setStartGameDisabled = function () {
        return this.game.players.length <= 3 ? false : true;
        //return this.game.players.length > 3 ? false : true;
    };
    LobbyTableComponent.prototype.setJoinGameDisable = function () {
        return this.isJoinGameDisabled || this.game.players.length >= 4;
    };
    return LobbyTableComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", game_1.Game)
], LobbyTableComponent.prototype, "game", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LobbyTableComponent.prototype, "isOtherGame", void 0);
LobbyTableComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: '[lobby-table]',
        templateUrl: './lobbytable.component.html',
        styleUrls: ['./lobbytable.component.css']
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, websocket_service_1.WebSocketService])
], LobbyTableComponent);
exports.LobbyTableComponent = LobbyTableComponent;
//# sourceMappingURL=lobbytable.component.js.map