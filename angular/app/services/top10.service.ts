import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {User} from '../models/user';

@Injectable()
export class Top10Service {

    players: User [] = [];

    constructor(private http: Http) {
    }

    getTop10ByVictories(): Observable<User[]> {
        return this.http.get('http://localhost:7777/api/v1/top10ByVictories')
            .map(response => {
                this.players = response.json();
                return this.players;
            })
            .catch(exception => {
                console.log(exception);
                return Observable.throw(exception);
            });
    }

    getTop10ByScore(): Observable<User[]> {
        return this.http.get('http://localhost:7777/api/v1/top10ByScore')
            .map(response => {
                this.players = response.json();
                return this.players;
            })
            .catch(exception => {
                console.log(exception);
                return Observable.throw(exception);
            });
    }
}
