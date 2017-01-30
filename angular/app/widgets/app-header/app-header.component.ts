import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

    constructor(private auth: AuthenticationService){
        this.auth = auth;
    }
}
