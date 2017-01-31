import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';

@Component({
    moduleId: module.id,
    selector: 'notification-panel',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
    playersChannel: string[] = [];

    constructor(private gameService: GameService){ }

    ngOnInit() {
        this.gameService.getPlayersMessages().subscribe((response:any) => this.playersChannel.push(<string>response));
    }
}
