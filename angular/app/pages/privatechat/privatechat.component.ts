import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  moduleId: module.id,
  selector: 'private-chat',
  templateUrl: './privatechat.component.html',
  styleUrls: ['./privatechat.component.css']
})
export class PrivateChatComponent implements OnInit{
  message: string;
  privateChat: string[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getPrivateGameChatMessages().subscribe((response:any) => this.privateChat.push(<string>response));
  }

  send(): void {
    this.gameService.sendPrivateGameChatMessage(this.gameService.getPrivateGame(), this.message);
    this.message = '';
  }
}




