import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { GameService } from '../../services/game.service';

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

  constructor(private authenticationService: AuthenticationService, private gameService: GameService) { }

  ngOnInit() {
    this.gameService.updateGame().subscribe((response: any) => {
      if (response.gameId == this.game._id) {
        this.game.players.push(response.player);
      }
    });
  }

  startGame():void {
    this.gameService.updateStateGame(this.authenticationService.user, this.game).subscribe((response: any) => {
      this.gameService.startGame(this.game);
    });
    this.gameService.sendRefresh();
  }

  joinGame():void {
    this.isJoinGameDisabled = true;
    if(this.game.players.length < 4){
      this.gameService.joinGameBD(this.authenticationService.user, this.game).subscribe((response: any) => {
        this.gameService.joinGame(response, this.authenticationService.user);
      });
    }
  }

  cancelGame():void {
    this.gameService.cancelGameBD(this.authenticationService.user, this.game).subscribe((response: any) => {
      this.gameService.cancelGame(this.game);
    });

    this.gameService.sendRefresh();
  }

  //ALTERAR!!!
  setStartGameDisabled() : boolean {
    return this.game.players.length >3 ? false : true;
  }

  setJoinGameDisable() : boolean {
    return this.isJoinGameDisabled || this.game.players.length >= 4 ;
  }
}
