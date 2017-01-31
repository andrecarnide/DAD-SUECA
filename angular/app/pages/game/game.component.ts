import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AuthenticationService} from '../../services/authentication.service';
import {GameService} from '../../services/game.service';

import {Card} from '../../models/card';
import {User} from "../../models/user";

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    myUser: User;
    trumpSuit: string = '';
    cardsBack: number[] = [0,1,2,3,4,5,6,7,8,9];
    myCards: Card[] = [];
    roundTableCards: Card[] = [];
    teamA: any[] = [];
    teamB: any[] = [];

    constructor(private gameService: GameService, private authService: AuthenticationService, private router: ActivatedRoute) {
    }

    ngOnInit() {

        this.router.params.subscribe((response: any) => {
            this.gameService.sendGame(response.id);
        });

        this.myUser = this.authService.user;

        this.getMyCards();
        this.getTrumpSuitGame();
        this.getTableCards();
    }

    getTrumpSuitGame(): void {
        this.gameService.getTrumpSuit().subscribe((response: any) => this.trumpSuit = response);
    }

    getMyCards(): void {
        this.gameService.getGame().subscribe((response: any) => {
            if (response.userId == this.authService.user._id) {
                response.playerCards.forEach((item: any) => {
                    this.myCards.push(new Card(item.suite, item.value));
                });
            }
        });
    }

    getTableCards(): void {
        this.gameService.getPlayCard().subscribe((response: any) => {
            if(this.roundTableCards.length <= 3) {
                this.roundTableCards.push(new Card(response.card.suite, response.card.value));
            }
            else{
                //verifica jodada, recolhe para array jodaga e faz clear da table
            }
        });
    }

    playCard(card: Card): void {
        this.gameService.sendPlayCard(this.gameService.getPrivateGame(), card, this.authService.user)
    }
}
