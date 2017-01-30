const io = require('socket.io');

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

            client.on('join_game', (data) => {
                let gameJoined = {
                    //board: new Tabuleiro(),
                    score: 0,
                    defeated: 0,
                    playerTurn: 0,
                    order: {},
                    opponents: {}
                };
                client.player.games[data.game._id] = gameJoined;
                client.join(data.game._id);
                this.io.emit('update_game', { gameId: data.game._id , player: data.player });

                let date = new Date();
                let dateFormat = [date.getDate(),  date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

                client.broadcast.emit('players', '['+dateFormat+'] '+client.player.username+ ' joined the game '+data.game.gameName+'.');
            });

            client.on('new_game', (game) => {
                let newGame = {
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

                let date = new Date();
                let dateFormat = [date.getDate(),  date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

                client.broadcast.emit('players', '['+dateFormat+'] A new game '+game.gameName+' has been created by '+client.player.username+'.');
            });

            client.on('cancel_game', (game) => {
                let date = new Date();
                let dateFormat = [date.getDate(),  date.getMonth() + 1, date.getFullYear()].join('/') + ' - ' +
                    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

                client.broadcast.emit('players', '['+dateFormat+'] '+client.player.username+ ' canceled the game '+game.gameName+'.');
            });

            client.on('start_game', (game) => {
                this.io.to(game._id).emit('start_game', game);
                this.io.to(game._id).emit('number_of_players', game.players.length);
            });

            client.on('number_of_players', (game) => {
                client.player.games[game._id].numberOfPlayers = game.players.length;
                //socket.player.games[game._id].nTiros = 2 * (game.players.length - 1);
            });
        });
    };

    public notifyAll = (channel: string, message: string) => {
        this.io.sockets.emit(channel, message);
    }; 
}

export class Player {
    public username: String;
    public games;

    constructor() {
        this.username = "";
        this.games = {};
    }
};
