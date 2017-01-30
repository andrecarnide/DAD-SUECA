import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  moduleId: module.id,
  selector: 'private-chat',
  templateUrl: './privatechat.component.html',
  styleUrls: ['./privatechat.component.css']
})
export class PrivateChatComponent {
  message: string;
  privateChat: string[] = [];

  constructor(private websocketService: WebSocketService) { }

  ngOnInit() {
    this.websocketService.getPrivateGameChatMessages().subscribe((response:any) => this.privateChat.push(<string>response));
  }

  send(): void {
    this.websocketService.sendPrivateGameChatMessage(this.websocketService.getPrivateGame(), this.message);
    this.message = '';
  }
}




