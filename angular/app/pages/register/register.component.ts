import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { WebSocketService } from '../../services/websocket.service';

import { User }    from '../../models/user';


@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './register.component.html'
})

export class RegisterComponent {
    isRegisterFailed: boolean;
    usernameEqual: boolean;
    emailEqual: boolean;
    user = new User('', '', '', '', 0, 0, '', '', '', '');

    constructor(private webSocketService: WebSocketService, private authenticationService: AuthenticationService, private router: Router) {
    }

    register() {
        this.isRegisterFailed = false;

        this.authenticationService.register(this.user.name, this.user.username, this.user.email, this.user.password, this.user.avatar).subscribe(registered => {
            if (registered) {
                if (registered['message'] === 'This user already exists') {
                    this.usernameEqual = true;
                } else if (registered['message'] === 'This Email already exists') {
                    this.emailEqual = true;
                } else {
                    this.isRegisterFailed = false;
                    //this.webSocketService.sendRegisterMessage(registered);
                    this.router.navigateByUrl('/login');
                    alert('User created successfully!');
                }
            } else {
                this.isRegisterFailed = true;
            }
        });
    }
}

