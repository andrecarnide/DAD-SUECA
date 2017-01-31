import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { GameService } from '../../services/game.service';

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

  constructor(private authenticationService: AuthenticationService, private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.gameService.getNewGame().subscribe((response: any) => {
      this.otherGames.push(response);
    });

    this.gameService.getPendingGames(this.authenticationService.user).subscribe(response => {
      response.forEach(game => {
        if (game.creatorId == this.authenticationService.user._id) {
          this.myGames.push(game);
        } else {
          this.otherGames.push(game);
        }
      });
    });

    this.gameService.getRefresh().subscribe((response: any) => {
      this.myGames = [];
      this.otherGames = [];
      this.refresh();
    });

    this.gameService.getStartGame().subscribe((response: any) => {
      this.gameService.setPrivateGame(response._id);
      this.router.navigateByUrl('/game/'+response._id);
    });
  }

  createGame(): void {
    this.gameService.createNewGame(this.authenticationService.user, this.game).subscribe((response: any) => {
      if (response) {
        this.gameService.createGame(response, this.authenticationService.user);
        this.myGames.push(response);
      } else {
        console.error('Error. Impossible create game.');
      }
    });
  }

  refresh() {
    this.gameService.getPendingGames(this.authenticationService.user).subscribe(response => {
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
