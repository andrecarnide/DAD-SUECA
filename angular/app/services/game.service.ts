import {Injectable}    from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as io from 'socket.io-client';

import {Game} from "../models/game";
import {User} from "../models/user";
import {Deck} from "../models/deck";
import {Card} from "../models/card";;

@Injectable()
export class GameService {

    private socket: SocketIOClient.Socket;
    private privateGame: String;

    constructor(private http: Http) {
        if (!this.socket) {
            this.socket = io(`http://localhost:7777`);
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

    getPrivateGameChatMessages(): Observable<any> {
        return this.listenOnChannel('private_chat');
    }

    getTrumpSuit(): Observable<any> {
        return this.listenOnChannel('trump_suit');
    }

    getGame(): Observable<any> {
        return this.listenOnChannel('private_game');
    }

    getPlayCard(): Observable<any> {
        return this.listenOnChannel('play_card');
    }

    sendLoginMessage(message: any) {
        this.socket.emit('login', message);
    }

    sendChatMessage(message: any) {
        this.socket.emit('chat', message);
    }

    createGame(game: Game, user: any): void {
        this.socket.emit('new_game', {game, user});
    }

    startGame(game: Game): void {
        this.socket.emit('start_game', game);
    }

    sendRefresh() {
        this.socket.emit('refresh');
    }

    sendGame(privateGame: String) {
        this.socket.emit('private_game', privateGame);
    }

    joinGame(game: Game, user: any): void {
        this.socket.emit('join_game', {game, user});
    }

    cancelGame(game: Game): void {
        this.socket.emit('cancel_game', game);
    }

    sendPrivateGameChatMessage(privateGame: String, message: any) {
        this.socket.emit('private_chat', {privateGame, message});
    }

    sendPlayCard(privateGame: String, card: Card, user: User) {
        this.socket.emit('play_card', {privateGame, card, user});
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
        let deck : Deck = new Deck();

        return this.http.post('http://localhost:7777/api/v1/games',
            {
                creatorId: user._id,
                gameName: game.name,
                state: 'pending',
                creatorUsername: user.username,
                deck: deck,
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

        return this.http.put('http://localhost:7777/api/v1/gamestate/' + game._id , null, options)
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
