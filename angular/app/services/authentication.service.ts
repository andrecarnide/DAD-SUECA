import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {User} from '../models/user';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
    user: User;

    constructor(private http: Http) {
    }

    login(username: string, password: string): Observable<User> {
        return this.http.post('http://localhost:7777/api/v1/login', {username: username, password: password})
            .map(response => {
                this.user = <User>response.json();
                return this.user;
            })
            .catch(exception => {
                console.log(exception);
                return Observable.of<User>(null);
            });
    }

    logout(): Observable<any> {
        let options = this.buildHeaders();

        return this.http.post('http://localhost:7777/api/v1/logout',{},options)
            .map(response => {
                response.json();
                this.user = null;
                sessionStorage.clear();
                return this.user;
            })
            .catch(exception => {
                console.log(exception);
                return Observable.throw(exception);
            });
    }

    register(name: string, username: string, email: string, password: string, avatar: string): Observable<string> {
        return this.http.post('http://localhost:7777/api/v1/register', {
            name: name,
            username: username,
            email: email,
            password: password,
            avatar: avatar
        })
            .map(response => {
                return response.json();
            })
            .catch(error => {
                return Observable.throw(error);
            });
    }

    buildHeaders(): RequestOptions {
        let headers = new Headers();
        headers.append('Authorization', 'bearer ' + this.user.token);
        headers.append('Content-Type', 'application/json');

        return new RequestOptions({headers: headers});
    }

    isAuthenticated(): boolean {
        if (this.user == null)
            return false;

        return true;
    }
}