import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User }    from '../../models/user';
import { AuthenticationService }    from '../../services/authentication.service';
import { GameService } from '../../services/game.service';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    isLogginFailed: boolean;
    user = new User('', '', '', '', 0, 0, '', '', '', '');

    constructor(private authenticationService: AuthenticationService, private router: Router, private gameService: GameService) { }

    login(): void {
        this.isLogginFailed = false;
        this.authenticationService.login(this.user.username, this.user.password).subscribe(logged => {
            if (logged) {
                this.isLogginFailed = false;
                this.gameService.sendLoginMessage(logged);
                sessionStorage.setItem('player',JSON.stringify(logged));
                this.router.navigateByUrl('/');
            } else {
                this.isLogginFailed = true;
            }
        });
    }
}



