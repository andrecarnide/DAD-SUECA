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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var io = require("socket.io-client");
var WebSocketService = (function () {
    function WebSocketService(http) {
        this.http = http;
        if (!this.socket) {
            this.socket = io("http://localhost:7777");
        }
    }
    /////////////////////////////////////////////////////////////////////////
    WebSocketService.prototype.getChatMessages = function () {
        return this.listenOnChannel('chat');
    };
    WebSocketService.prototype.getNewGame = function () {
        return this.listenOnChannel('new_game');
    };
    WebSocketService.prototype.getRefresh = function () {
        return this.listenOnChannel('refresh');
    };
    WebSocketService.prototype.getStartGame = function () {
        return this.listenOnChannel('start_game');
    };
    WebSocketService.prototype.updateGame = function () {
        return this.listenOnChannel('update_game');
    };
    WebSocketService.prototype.getPlayersMessages = function () {
        return this.listenOnChannel('players');
    };
    WebSocketService.prototype.getNumberOfPlayers = function () {
        return this.listenOnChannel('number_of_players');
    };
    WebSocketService.prototype.getPrivateGameChatMessages = function () {
        return this.listenOnChannel('private_chat');
    };
    WebSocketService.prototype.sendLoginMessage = function (message) {
        this.socket.emit('login', message);
    };
    WebSocketService.prototype.sendChatMessage = function (message) {
        this.socket.emit('chat', message);
    };
    WebSocketService.prototype.sendNumberOfPlayers = function (game) {
        this.socket.emit('number_of_players', game);
    };
    WebSocketService.prototype.createGame = function (game) {
        this.socket.emit('new_game', game);
    };
    WebSocketService.prototype.startGame = function (game) {
        this.socket.emit('start_game', game);
    };
    WebSocketService.prototype.sendRefresh = function () {
        this.socket.emit('refresh');
    };
    WebSocketService.prototype.joinGame = function (game, player) {
        this.socket.emit('join_game', { game: game, player: player });
    };
    WebSocketService.prototype.cancelGame = function (game) {
        this.socket.emit('cancel_game', game);
    };
    WebSocketService.prototype.sendPrivateGameChatMessage = function (privateGame, message) {
        this.socket.emit('private_chat', { privateGame: privateGame, message: message });
    };
    /////////////////////////////////////////////////////////////////////////
    WebSocketService.prototype.cancelGameBD = function (user, game) {
        var options = this.buildHeaders(user);
        return this.http.put('http://localhost:7777/api/v1/games/' + game._id + '/cancel', null, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (exception) {
            console.log(exception);
            return Rx_1.Observable.throw(exception);
        });
    };
    WebSocketService.prototype.createNewGame = function (user, game) {
        var options = this.buildHeaders(user);
        return this.http.post('http://localhost:7777/api/v1/games', {
            creatorId: user._id,
            gameName: game.name,
            state: 'pending',
            creatorUsername: user.username,
            players: [{ player: user._id, username: user.username, score: 0 }]
        }, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (exception) {
            console.log(exception);
            return Rx_1.Observable.throw(exception);
        });
    };
    WebSocketService.prototype.getPendingGames = function (user) {
        var options = this.buildHeaders(user);
        var pendingGames = [];
        return this.http.get('http://localhost:7777/api/v1/games', options)
            .map(function (response) {
            var responseJSON = response.json();
            responseJSON.forEach(function (game) {
                if (game.state === 'pending') {
                    pendingGames.push(game);
                }
            });
            return pendingGames;
        })
            .catch(function (exception) {
            console.log(exception);
            return Rx_1.Observable.throw(exception);
        });
    };
    WebSocketService.prototype.joinGameBD = function (user, game) {
        var options = this.buildHeaders(user);
        return this.http.put('http://localhost:7777/api/v1/joingame/' + game._id, {
            player: user._id,
            username: user.username,
            score: 0
        }, options)
            .map(function (response) {
            var responseJSON = response.json();
            return responseJSON;
        })
            .catch(function (exception) {
            console.log(exception);
            return Rx_1.Observable.throw(exception);
        });
    };
    WebSocketService.prototype.updateStateGame = function (user, game) {
        var options = this.buildHeaders(user);
        return this.http.put('http://localhost:7777/api/v1/gamestate/' + game._id, null, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (exception) {
            console.log(exception);
            return Rx_1.Observable.of(null);
        });
    };
    WebSocketService.prototype.buildHeaders = function (user) {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'bearer ' + user.token);
        headers.append('Content-Type', 'application/json');
        return new http_1.RequestOptions({ headers: headers });
    };
    WebSocketService.prototype.getPrivateGame = function () {
        return this.privateGame;
    };
    WebSocketService.prototype.setPrivateGame = function (privateGame) {
        this.privateGame = privateGame;
    };
    WebSocketService.prototype.listenOnChannel = function (channel) {
        var _this = this;
        return new Rx_1.Observable(function (observer) {
            _this.socket.on(channel, function (data) {
                observer.next(data);
            });
            return function () { return _this.socket.disconnect(); };
        });
    };
    return WebSocketService;
}());
WebSocketService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], WebSocketService);
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=websocket.service.js.map