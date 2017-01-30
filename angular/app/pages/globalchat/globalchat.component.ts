import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './globalchat.component.html',
  styleUrls: ['./globalchat.component.css']
})
export class GlobalChatComponent {
  message: string;
  chatChannel: string[] = [];

  constructor(private websocketService: WebSocketService) { }

  ngOnInit() {
    this.websocketService.getChatMessages().subscribe((response:any) => this.chatChannel.push(<string>response));
  }

  send(): void {
    this.websocketService.sendChatMessage(this.message);
    this.message = '';
  }
}




