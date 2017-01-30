import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticationService){
    this.auth = auth;
  }

  ngOnInit() {
  }
}
