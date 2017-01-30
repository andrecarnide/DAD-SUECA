import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    moduleId: module.id,
    selector: '.userBox',
    templateUrl: './user-box.component.html',
    styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent {

    constructor(private auth: AuthenticationService) {
        this.auth = auth;
    }

    logout(): void {
        this.auth.logout().subscribe(response => console.log(response));
    }
}
