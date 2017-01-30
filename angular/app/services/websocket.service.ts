import {Injectable}    from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as io from 'socket.io-client';

import {Game} from "../models/game";
import {User} from "../models/user";

@Injectable()
export class WebSocketService {

    private socket: SocketIOClient.Socket;
    private privateGame: String;

    constructor(private http: Http) {
        if (!this.socket) {
            this.socket = io(`http://localhost:8080`);
            //this.socket = io(`http://${window.location.hostname}:${window.location.port}`);
        }
    }

    /////////////////////////////////////////////////////////////////////////

    getChatMessages(): Observable<any> {
        return this.listenOnChannel('chat');
    }

    getNewGame(): Observable<any> {
        return this.listenOnChannel('new_game');
    }

    getRefresh(): Observable<any> {
        return this.listenOnChannel('refresh');
    }

    getStartGame(): Observable<any> {
        return this.listenOnChannel('start_game');
    }

    updateGame(): Observable<any> {
        return this.listenOnChannel('update_game');
    }

    getPlayersMessages(): Observable<any> {
        return this.listenOnChannel('players');
    }

    getNumberOfPlayers(): Observable<any> {
        return this.listenOnChannel('number_of_players');
    }

    getPrivateGameChatMessages(): Observable<any> {
        return this.listenOnChannel('private_chat');
    }

    sendLoginMessage(message: any) {
        this.socket.emit('login', message);
    }

    sendChatMessage(message: any) {
        this.socket.emit('chat', message);
    }

    sendNumberOfPlayers(game: Game): void {
        this.socket.emit('number_of_players', game);
    }

    createGame(game: Game): void {
        this.socket.emit('new_game', game);
    }

    startGame(game: Game): void {
        this.socket.emit('start_game', game);
    }

    sendRefresh() {
        this.socket.emit('refresh');
    }

    joinGame(game: Game, player: any): void {
        this.socket.emit('join_game', {game, player});
    }

    cancelGame(game: Game): void {
        this.socket.emit('cancel_game', game);
    }

    sendPrivateGameChatMessage(privateGame: String, message: any) {
        this.socket.emit('private_chat', {privateGame, message});
    }

    /////////////////////////////////////////////////////////////////////////

    cancelGameBD(user: User, game: Game): Observable<string> {
        let options = this.buildHeaders(user);

        return this.http.put('http://localhost:7777/api/v1/games/' + game._id + '/cancel', null, options)
            .map(response => {
                return response.json();
            })
            .catch(exception => {
                console.log(exception);
                return Observable.throw(exception);
            });
    }

    createNewGame(user: User, game: Game): Observable<string> {
        let options = this.buildHeaders(user);

        return this.http.post('http://localhost:7777/api/v1/games',
            {
                creatorId: user._id,
                gameName: game.name,
                state: 'pending',
                creatorUsername: user.username,
                players: [{player: user._id, username: user.username, score: 0}]
            }, options)
            .map(response => {
                return response.json();
            })
            .catch(exception => {
                console.log(exception);
                return Observable.throw(exception);
            });
    }

    getPendingGames(user: User): Observable<Game[]> {
        let options = this.buildHeaders(user);
        let pendingGames: Game[] = [];
        return this.http.get('http://localhost:7777/api/v1/games', options)
            .map(response => {
                let responseJSON = response.json();
                responseJSON.forEach((game: Game) => {
                    if (game.state === 'pending') {
                        pendingGames.push(game);
                    }
                });
                return pendingGames;
            })
            .catch(exception => {
                console.log(exception);
                return Observable.throw(exception);
            });
    }

    joinGameBD(user: User, game: Game): Observable<any> {
        let options = this.buildHeaders(user);

        return this.http.put('http://localhost:7777/api/v1/joingame/' + game._id, {
            player: user._id,
            username: user.username,
            score: 0
        }, options)
            .map(response => {
                let responseJSON = response.json();
                return responseJSON;
            })
            .catch(exception => {
                console.log(exception);
                return Observable.throw(exception);
            });
    }

    updateStateGame(user: User, game: Game): Observable<Game> {
        let options = this.buildHeaders(user);

        return this.http.put('http://localhost:7777/api/v1/gamestate/' + game._id, null, options)
            .map(response => {
                return response.json();
            })
            .catch(exception => {
                console.log(exception);
                return Observable.of<Game>(null);
            });
    }

    buildHeaders(user: User): RequestOptions {
        let headers = new Headers();
        headers.append('Authorization', 'bearer ' + user.token);
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({headers: headers});
    }

    public getPrivateGame(): String {
        return this.privateGame;
    }

    public setPrivateGame(privateGame: String): void {
        this.privateGame = privateGame;
    }

    private listenOnChannel(channel: string): Observable<any> {
        return new Observable((observer: any) => {
            this.socket.on(channel, (data: any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }
}
