import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { WebSocketService } from '../../services/websocket.service';

import { Game } from '../../models/game';

@Component({
  moduleId: module.id,
  selector: '[lobby-table]',
  templateUrl: './lobbytable.component.html',
  styleUrls: ['./lobbytable.component.css']
})
export class LobbyTableComponent implements OnInit {
  @Input() game : Game;
  @Input() isOtherGame: boolean;

  isJoinGameDisabled : boolean = false;

  constructor(private authenticationService: AuthenticationService, private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.updateGame();
  }

  updateGame():void {
    this.webSocketService.updateGame().subscribe((response: any) => {
      if (response.gameId == this.game._id) {
        this.game.players.push(response.player);
      }
    });
  }

  startGame():void {
    this.webSocketService.updateStateGame(this.authenticationService.user, this.game).subscribe((response: any) => {
      this.webSocketService.startGame(this.game);
    });
    this.webSocketService.sendRefresh();
  }

  joinGame():void {
    this.isJoinGameDisabled = true;
    if(this.game.players.length < 4){
      this.webSocketService.joinGameBD(this.authenticationService.user, this.game).subscribe((response: any) => {
        var player = {player: this.authenticationService.user._id, username: this.authenticationService.user.username, score: 0};
        this.webSocketService.joinGame(response, player);
      });
    }
  }

  cancelGame():void {
    this.webSocketService.cancelGameBD(this.authenticationService.user, this.game).subscribe((response: any) => {
      this.webSocketService.cancelGame(this.game);
    });

    this.webSocketService.sendRefresh();
  }

  //ALTERAR!!!
  setStartGameDisabled() : boolean {
    return this.game.players.length <=3 ? false : true;
    //return this.game.players.length > 3 ? false : true;
  }

  setJoinGameDisable() : boolean {
    return this.isJoinGameDisabled || this.game.players.length >= 4 ;
  }
}
