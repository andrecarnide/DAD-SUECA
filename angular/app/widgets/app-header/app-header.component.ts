import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {

    constructor(private auth: AuthenticationService){
        this.auth = auth;
    }
}
