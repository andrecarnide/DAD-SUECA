import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User }    from '../../models/user';
import { AuthenticationService }    from '../../services/authentication.service';
import { WebSocketService } from '../../services/websocket.service';

declare const FB:any;

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './login.component.html'
})

export class LoginComponent {

    isLogginFailed: boolean;
    user = new User('', '', '', '', 0, 0, '', '', '', '');

    constructor(private authenticationService: AuthenticationService, private router: Router, private webSocketService: WebSocketService) {
        FB.init({
            appId: '1127781007321022',
            cookie: false,  // enable cookies to allow the server to access
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8' // use graph api version 2.5
        });
    }

    statusChangeCallback(resp: any) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
            console.log('ligado');
            let id = resp.authResponse.userID;
            let accessToken = resp.authResponse.accessToken;
            this.getCurrentUserInfo(id, accessToken);
        } else if (resp.status === 'not_authorized') {
            console.log('nao ligado');
        } else {
            console.log('outros');
        }
    };

    getCurrentUserInfo(id: any, token: any) {
        FB.api('/me?fields=id,name,first_name', function (userInfo: any) {
            let name = userInfo.name;
            let id = userInfo.id;
            let first_name = userInfo.first_name;
            console.log(id);
            console.log(first_name);
            console.log(name);
            console.log(token);
            this.authenticationService.loginFace().then((r: any) => {
                this.user = r;
            });
        });
    }

    login(): void {
        this.isLogginFailed = false;
        this.authenticationService.login(this.user.username, this.user.password).subscribe(logged => {
            if (logged) {
                this.isLogginFailed = false;
                this.webSocketService.sendLoginMessage(logged);
                this.router.navigateByUrl('/');
            } else {
                this.isLogginFailed = true;
            }
        });
    }

    loginFacebook(): void {
        FB.login();
        FB.getLoginStatus((response: any) => {
            this.statusChangeCallback(response);
        });
    }
}



