import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { WebSocketService } from '../../services/websocket.service';

import { Game } from '../../models/game';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  myGames: Game[] = [];
  otherGames: Game[] = [];

  game = new Game('','','','','','','','',[{}]);

  constructor(private authenticationService: AuthenticationService, private webSocketService: WebSocketService, private router: Router) { }

  ngOnInit() {
    this.getNewGame();
    this.getPendingGames();
    this.getRefresh();
    this.getStartGame();
  }

  getNewGame(): void {
    this.webSocketService.getNewGame().subscribe((response: any) => {
      this.otherGames.push(response);
    });
  }

  getPendingGames(): void {
    this.webSocketService.getPendingGames(this.authenticationService.user).subscribe(response => {
      response.forEach(game => {
        if (game.creatorId == this.authenticationService.user._id) {
          this.myGames.push(game);
        } else {
          this.otherGames.push(game);
        }
      });
    });
  }

  getRefresh(): void {
    this.webSocketService.getRefresh().subscribe((response: any) => {
      this.myGames = [];
      this.otherGames = [];
      this.refresh();
    });
  }

  getStartGame(): void {
    this.webSocketService.getStartGame().subscribe((response: any) => {
      this.webSocketService.setPrivateGame(response._id);
      this.webSocketService.sendNumberOfPlayers(response);
      this.router.navigateByUrl('/game');
    });
  }

  createGame(): void {
    this.webSocketService.createNewGame(this.authenticationService.user, this.game).subscribe((response: any) => {
      if (response) {
        this.webSocketService.createGame(response);
        this.myGames.push(response);
      } else {
        console.error('Error. Impossible create game.');
      }
    });
  }

  refresh() {
    this.webSocketService.getPendingGames(this.authenticationService.user).subscribe(response => {
      this.myGames = [];
      this.otherGames = [];

      response.forEach(game => {
        if(game.creatorId == this.authenticationService.user._id) {
          this.myGames.push(game);
        } else {
          this.otherGames.push(game);
        }
      });
    });
  }
}
