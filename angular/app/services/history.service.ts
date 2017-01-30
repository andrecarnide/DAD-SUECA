import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Game} from '../models/game';
import {User} from "../models/user";

@Injectable()
export class HistoryService {
    games: Game [] = [];

    constructor(private http: Http) {
    }

    getHistoryGames(): Observable<Game[]> {
        return this.http.get('http://localhost:7777/api/v1/history')
            .map(response => {
                this.games = response.json();
                return this.games;
            })
            .catch(exception => {
                console.log(exception);
                return Observable.throw(exception);
            });
    }
}
