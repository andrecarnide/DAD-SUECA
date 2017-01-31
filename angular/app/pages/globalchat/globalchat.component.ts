import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './globalchat.component.html',
  styleUrls: ['./globalchat.component.css']
})
export class GlobalChatComponent implements OnInit{
  message: string;
  chatChannel: string[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getChatMessages().subscribe((response:any) => this.chatChannel.push(<string>response));
  }

  send(): void {
    this.gameService.sendChatMessage(this.message);
    this.message = '';
  }
}




