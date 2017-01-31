const io = require('socket.io');

import { Player } from "./game/player";
import {PlayerGame} from "./game/playerGame";
import { Card } from "./game/card";


export class WebSocketServer {

    public io: any;

    public init = (server: any) => {
        this.io = io.listen(server);

        this.io.sockets.on('connection', (client: any) => {
            client.player = new Player();

            client.on('login', () => {
                let date = new Date();
                let dateFormat = [date.getDate(),  date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                client.emit('players', '['+dateFormat+']' + ' Welcome to battleship.');
            });

            client.on('login', (loggedUser) => {
                client.player.username = loggedUser.username;

                let date = new Date();
                let dateFormat = [date.getDate(),  date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
                client.broadcast.emit('players', '['+dateFormat+'] '+ loggedUser.username + ': A new player has arrived.');
            });

            client.on('chat', (data) => this.io.emit('chat', client.player.username + ': ' + data));

            client.on('private_chat', (data) => {
                this.io.to(data.privateGame).emit('private_chat', client.player.username + ': ' + data.message);
            });

            client.on('refresh', (data) => this.io.emit('refresh'));

            client.on('cancel_game', (game) => {
                let date = new Date();
                let dateFormat = [date.getDate(),  date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

                client.broadcast.emit('players', '['+dateFormat+'] '+client.player.username+ ' canceled the game '+game.gameName+'.');
            });


            client.on('new_game', (data) => {
                let playerCards: Card[] = data.game.deck.cardsPlayer1;
                let playerOrder: number = 1;
                let playerTeam: string = 'A';

                let newPlayer = new PlayerGame(data.user._id, data.game._id, playerCards, playerOrder, playerTeam);
                client.player.games.push(newPlayer);

                client.join(data.game._id);
                client.broadcast.emit('new_game', data.game);

                let date = new Date();
                let dateFormat = [date.getDate(),  date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

                client.broadcast.emit('players', '['+dateFormat+'] A new game '+data.game.gameName+' has been created by '+client.player.username+'.');
            });

            client.on('join_game', (data) => {
                let playerCards: Card[] = [];
                let playerOrder: number = 0;
                let playerTeam: string = '';

                if(data.game.players.length == 2){
                    playerCards = data.game.deck.cardsPlayer2;
                    playerOrder = 3;
                    playerTeam = 'A'
                }else if(data.game.players.length == 3){
                    playerCards = data.game.deck.cardsPlayer3;
                    playerOrder = 2;
                    playerTeam = 'B';
                }else if(data.game.players.length == 4) {
                    playerCards = data.game.deck.cardsPlayer4;
                    playerOrder = 4;
                    playerTeam = 'B'
                }

                let playerJoined = new PlayerGame(data.user._id,data.game._id, playerCards, playerOrder, playerTeam);
                client.player.games.push(playerJoined);

                client.join(data.game._id);
                this.io.emit('update_game', { gameId: data.game._id , player: data.player });

                let date = new Date();
                let dateFormat = [date.getDate(),  date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

                client.broadcast.emit('players', '['+dateFormat+'] '+client.player.username+ ' joined the game '+data.game.gameName+'.');
            });

            client.on('private_game', (privateGameId) => {
                client.player.games.forEach( privateGame => {
                    if(privateGame.gameId == privateGameId){
                        this.io.to(privateGameId).emit('private_game', privateGame);
                        console.log(privateGame)
                    }
                });
            });

            client.on('play_card', (data) => {
                this.io.to(data.privateGame).emit('play_card', data);
            });

            client.on('start_game', (game) => {
                this.io.to(game._id).emit('start_game', game);
                this.io.to(game._id).emit('trump_suit', game.deck.trumpSuit);
            });
        });
    };

    public notifyAll = (channel: string, message: string) => {
        this.io.sockets.emit(channel, message);
    }; 
}

