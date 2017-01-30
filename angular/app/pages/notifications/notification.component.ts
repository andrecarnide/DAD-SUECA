import { Component, OnInit } from '@angular/core';

import { WebSocketService } from '../../services/websocket.service';

@Component({
    moduleId: module.id,
    selector: 'notification-panel',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
    playersChannel: string[] = [];


    constructor(private websocketService: WebSocketService){ }

    ngOnInit() {
        this.websocketService.getPlayersMessages().subscribe((response:any) => this.playersChannel.push(<string>response));
    }
}
