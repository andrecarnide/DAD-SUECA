import {Component, OnInit} from '@angular/core';

import { HistoryService } from '../../services/history.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Game } from '../../models/game';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    allHistoryGames: Game[] = [];
    myHistoryGames: Game[] = [];
    value: string = '';
    state: string = '';
    hideTableMyHistory: boolean = false;

    constructor(private historyService: HistoryService, private auth: AuthenticationService) {
        this.auth = auth;
    }

    ngOnInit() {
        this.getHistory();
        this.getMyHistory();
    }

    getHistory(): void {
        this.historyService.getHistoryGames().subscribe(response => this.allHistoryGames = response);
    }

    getMyHistory(): void {
        this.historyService.getHistoryGames().subscribe(response => {
            response.forEach(game => {
                if (game.creatorId == this.auth.user._id) {
                    this.myHistoryGames.push(game);
                }
            });
        })
    }

    toggleTableMyHistory(): void {
        if (this.hideTableMyHistory) {
            this.hideTableMyHistory = false;
        }
        else
            this.hideTableMyHistory = true;
    }

    setFinished(state: string): string {
        if (state == 'ended') {
            return 'Yes';
        }
        else {
            return 'No';
        }
    }
}
