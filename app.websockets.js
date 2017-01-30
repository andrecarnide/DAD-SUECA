"use strict";
var io = require('socket.io');
var WebSocketServer = (function () {
    function WebSocketServer() {
        var _this = this;
        this.init = function (server) {
            _this.io = io.listen(server);
            _this.io.sockets.on('connection', function (client) {
                client.player = new Player();
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
                client.on('join_game', function (data) {
                    var gameJoined = {
                        //board: new Tabuleiro(),
                        score: 0,
                        defeated: 0,
                        playerTurn: 0,
                        order: {},
                        opponents: {}
                    };
                    client.player.games[data.game._id] = gameJoined;
                    client.join(data.game._id);
                    _this.io.emit('update_game', { gameId: data.game._id, player: data.player });
                    var date = new Date();
                    var dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    client.broadcast.emit('players', '[' + dateFormat + '] ' + client.player.username + ' joined the game ' + data.game.gameName + '.');
                });
                client.on('new_game', function (game) {
                    var newGame = {
                        //board: new Tabuleiro(),
                        score: 0,
                        defeated: 0,
                        playerTurn: 0,
                        order: {},
                        opponents: {}
                    };
                    client.player.games[game._id] = newGame;
                    client.join(game._id);
                    client.broadcast.emit('new_game', game);
                    var date = new Date();
                    var dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    client.broadcast.emit('players', '[' + dateFormat + '] A new game ' + game.gameName + ' has been created by ' + client.player.username + '.');
                });
                client.on('cancel_game', function (game) {
                    var date = new Date();
                    var dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                    client.broadcast.emit('players', '[' + dateFormat + '] ' + client.player.username + ' canceled the game ' + game.gameName + '.');
                });
                client.on('start_game', function (game) {
                    _this.io.to(game._id).emit('start_game', game);
                    _this.io.to(game._id).emit('number_of_players', game.players.length);
                });
                client.on('number_of_players', function (game) {
                    client.player.games[game._id].numberOfPlayers = game.players.length;
                    //socket.player.games[game._id].nTiros = 2 * (game.players.length - 1);
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
var Player = (function () {
    function Player() {
        this.username = "";
        this.games = {};
    }
    return Player;
}());
exports.Player = Player;
;
