import { Component, OnInit }  from '@angular/core';
import { Router }             from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  moduleId: module.id,
  selector: 'menu-aside',
  templateUrl: './menu-aside.component.html',
  styleUrls: ['./menu-aside.component.css']
})
export class MenuAsideComponent implements OnInit {
  private current_url: string;
  private links: Array<any> = [
    {
      "title": "Home",
      "icon": "home",
      "link": ['/']
    },
    {
      "title": "Lobby",
      "icon": "gamepad",
      "link": ['/lobby']
    },
    {
      "title": "Game",
      "icon": "users",
      "link": ['/game']
    },
    {
      "title": "History",
      "icon": "history",
      "link": ['/history']
    },
    {
      "title": "Top 10",
      "icon": "table",
      "link": ['/top10']
    },
    {
      "title": "Global Chat",
      "icon": "wechat",
      "link": ['/globalchat']
    },
  ];

  constructor(public router: Router, private auth: AuthenticationService){
    this.router.events.subscribe((evt) => this.current_url = evt.url );
    this.auth = auth;
  }

  ngOnInit() {
    
  }
}
