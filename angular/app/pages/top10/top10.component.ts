import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { Top10Service } from '../../services/top10.service';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './top10.component.html',
    styleUrls: ['./top10.component.css']
})
export class Top10Component implements OnInit {
    playersByVictories: User[] = [];
    playersByScore: User[] = [];

    constructor(private top10Service: Top10Service) {
    }

    ngOnInit() {
        this.getTop10PlayersByVictories();
        this.getTop10PlayersByScore();
    }

    getTop10PlayersByVictories(): void {
        this.top10Service.getTop10ByVictories().subscribe(response => this.playersByVictories = response);
    }

    getTop10PlayersByScore(): void {
        this.top10Service.getTop10ByScore().subscribe(response => this.playersByScore = response);
    }
}
