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
var io = require('socket.io-client');
var deck_1 = require("../models/deck");
;
var GameService = (function () {
    function GameService(http) {
        this.http = http;
        if (!this.socket) {
            this.socket = io("http://localhost:7777");
        }
    }
    /////////////////////////////////////////////////////////////////////////
    GameService.prototype.getChatMessages = function () {
        return this.listenOnChannel('chat');
    };
    GameService.prototype.getNewGame = function () {
        return this.listenOnChannel('new_game');
    };
    GameService.prototype.getRefresh = function () {
        return this.listenOnChannel('refresh');
    };
    GameService.prototype.getStartGame = function () {
        return this.listenOnChannel('start_game');
    };
    GameService.prototype.updateGame = function () {
        return this.listenOnChannel('update_game');
    };
    GameService.prototype.getPlayersMessages = function () {
        return this.listenOnChannel('players');
    };
    GameService.prototype.getPrivateGameChatMessages = function () {
        return this.listenOnChannel('private_chat');
    };
    GameService.prototype.getTrumpSuit = function () {
        return this.listenOnChannel('trump_suit');
    };
    GameService.prototype.getGame = function () {
        return this.listenOnChannel('private_game');
    };
    GameService.prototype.getPlayCard = function () {
        return this.listenOnChannel('play_card');
    };
    GameService.prototype.sendLoginMessage = function (message) {
        this.socket.emit('login', message);
    };
    GameService.prototype.sendChatMessage = function (message) {
        this.socket.emit('chat', message);
    };
    GameService.prototype.createGame = function (game, user) {
        this.socket.emit('new_game', { game: game, user: user });
    };
    GameService.prototype.startGame = function (game) {
        this.socket.emit('start_game', game);
    };
    GameService.prototype.sendRefresh = function () {
        this.socket.emit('refresh');
    };
    GameService.prototype.sendGame = function (privateGame) {
        this.socket.emit('private_game', privateGame);
    };
    GameService.prototype.joinGame = function (game, user) {
        this.socket.emit('join_game', { game: game, user: user });
    };
    GameService.prototype.cancelGame = function (game) {
        this.socket.emit('cancel_game', game);
    };
    GameService.prototype.sendPrivateGameChatMessage = function (privateGame, message) {
        this.socket.emit('private_chat', { privateGame: privateGame, message: message });
    };
    GameService.prototype.sendPlayCard = function (privateGame, card, user) {
        this.socket.emit('play_card', { privateGame: privateGame, card: card, user: user });
    };
    /////////////////////////////////////////////////////////////////////////
    GameService.prototype.cancelGameBD = function (user, game) {
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
    GameService.prototype.createNewGame = function (user, game) {
        var options = this.buildHeaders(user);
        var deck = new deck_1.Deck();
        return this.http.post('http://localhost:7777/api/v1/games', {
            creatorId: user._id,
            gameName: game.name,
            state: 'pending',
            creatorUsername: user.username,
            deck: deck,
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
    GameService.prototype.getPendingGames = function (user) {
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
    GameService.prototype.joinGameBD = function (user, game) {
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
    GameService.prototype.updateStateGame = function (user, game) {
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
    GameService.prototype.buildHeaders = function (user) {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'bearer ' + user.token);
        headers.append('Content-Type', 'application/json');
        return new http_1.RequestOptions({ headers: headers });
    };
    GameService.prototype.getPrivateGame = function () {
        return this.privateGame;
    };
    GameService.prototype.setPrivateGame = function (privateGame) {
        this.privateGame = privateGame;
    };
    GameService.prototype.listenOnChannel = function (channel) {
        var _this = this;
        return new Rx_1.Observable(function (observer) {
            _this.socket.on(channel, function (data) {
                observer.next(data);
            });
            return function () { return _this.socket.disconnect(); };
        });
    };
    GameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map