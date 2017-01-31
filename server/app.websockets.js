"use strict";
var io = require('socket.io');
var player_1 = require("./game/player");
var playerGame_1 = require("./game/playerGame");
var WebSocketServer = (function () {
    function WebSocketServer() {
        var _this = this;
        this.init = function (server) {
            _this.io = io.listen(server);
            _this.io.sockets.on('connection', function (client) {
                client.player = new player_1.Player();
                client.on('login', function () {
                    var date = new Date();
                    var dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    client.emit('players', '[' + dateFormat + ']' + ' Welcome to battleship.');
                });
                client.on('login', function (loggedUser) {
                    client.player.username = loggedUser.username;
                    var date = new Date();
                    var dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    client.broadcast.emit('players', '[' + dateFormat + '] ' + loggedUser.username + ': A new player has arrived.');
                });
                client.on('chat', function (data) { return _this.io.emit('chat', client.player.username + ': ' + data); });
                client.on('private_chat', function (data) {
                    _this.io.to(data.privateGame).emit('private_chat', client.player.username + ': ' + data.message);
                });
                client.on('refresh', function (data) { return _this.io.emit('refresh'); });
                client.on('cancel_game', function (game) {
                    var date = new Date();
                    var dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    client.broadcast.emit('players', '[' + dateFormat + '] ' + client.player.username + ' canceled the game ' + game.gameName + '.');
                });
                client.on('new_game', function (data) {
                    var playerCards = data.game.deck.cardsPlayer1;
                    var playerOrder = 1;
                    var playerTeam = 'A';
                    var newPlayer = new playerGame_1.PlayerGame(data.user._id, data.game._id, playerCards, playerOrder, playerTeam);
                    client.player.games.push(newPlayer);
                    client.join(data.game._id);
                    client.broadcast.emit('new_game', data.game);
                    var date = new Date();
                    var dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    client.broadcast.emit('players', '[' + dateFormat + '] A new game ' + data.game.gameName + ' has been created by ' + client.player.username + '.');
                });
                client.on('join_game', function (data) {
                    var playerCards = [];
                    var playerOrder = 0;
                    var playerTeam = '';
                    if (data.game.players.length == 2) {
                        playerCards = data.game.deck.cardsPlayer2;
                        playerOrder = 3;
                        playerTeam = 'A';
                    }
                    else if (data.game.players.length == 3) {
                        playerCards = data.game.deck.cardsPlayer3;
                        playerOrder = 2;
                        playerTeam = 'B';
                    }
                    else if (data.game.players.length == 4) {
                        playerCards = data.game.deck.cardsPlayer4;
                        playerOrder = 4;
                        playerTeam = 'B';
                    }
                    var playerJoined = new playerGame_1.PlayerGame(data.user._id, data.game._id, playerCards, playerOrder, playerTeam);
                    client.player.games.push(playerJoined);
                    client.join(data.game._id);
                    _this.io.emit('update_game', { gameId: data.game._id, player: data.player });
                    var date = new Date();
                    var dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    client.broadcast.emit('players', '[' + dateFormat + '] ' + client.player.username + ' joined the game ' + data.game.gameName + '.');
                });
                client.on('private_game', function (privateGameId) {
                    client.player.games.forEach(function (privateGame) {
                        if (privateGame.gameId == privateGameId) {
                            _this.io.to(privateGameId).emit('private_game', privateGame);
                            console.log(privateGame);
                        }
                    });
                });
                client.on('play_card', function (data) {
                    _this.io.to(data.privateGame).emit('play_card', data);
                });
                client.on('start_game', function (game) {
                    _this.io.to(game._id).emit('start_game', game);
                    _this.io.to(game._id).emit('trump_suit', game.deck.trumpSuit);
                });
            });
        };
        this.notifyAll = function (channel, message) {
            _this.io.sockets.emit(channel, message);
        };
    }
    return WebSocketServer;
}());
exports.WebSocketServer = WebSocketServer;
