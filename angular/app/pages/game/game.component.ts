import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { WebSocketService } from '../../services/websocket.service';

import { Deck } from './deck';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private deck: Deck = new Deck();

  //private tableCards: Cards[] = [];

  constructor(private webSocketService : WebSocketService) {
  }

  ngOnInit() {
  }
}
