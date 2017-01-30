import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';

let modules = [
  BrowserModule,
  FormsModule,
  HttpModule,
  AppRoutingModule
];

import { AppHeaderComponent } from "./widgets/app-header/app-header.component";
import { MenuAsideComponent } from "./widgets/menu-aside/menu-aside.component";
import { UserBoxComponent } from "./widgets/user-box/user-box.component"
import { AppFooterComponent } from "./widgets/app-footer/app-footer.component"
import { AppComponent } from './app.component';
let widgets = [
  AppComponent,
  AppHeaderComponent,
  MenuAsideComponent,
  UserBoxComponent,
  AppFooterComponent
];

import { GuardService } from './services/guard.service';
import { AuthenticationService } from "./services/authentication.service";
import { WebSocketService } from './services/websocket.service';
import { Top10Service } from './services/top10.service';
import { HistoryService } from './services/history.service';
let services =  [
  WebSocketService,
  AuthenticationService,
  GuardService,
  Top10Service,
  HistoryService
];

import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { Top10Component } from './pages/top10/top10.component';
import { GlobalChatComponent } from './pages/globalchat/globalchat.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LobbyComponent } from "./pages/lobby/lobby.component";
import { PageNotFoundComponent } from "./pages/pagenotfound/pagenotfound.component";
import { NotificationComponent } from './pages/notifications/notification.component';
import { LobbyTableComponent } from './pages/lobbytable/lobbytable.component';
import { GameComponent } from './pages/game/game.component';
import { PrivateChatComponent } from './pages/privatechat/privatechat.component';
let pages = [
  HomeComponent,
  HistoryComponent,
  Top10Component,
  GlobalChatComponent,
  LoginComponent,
  RegisterComponent,
  LobbyComponent,
  PageNotFoundComponent,
  NotificationComponent,
  LobbyTableComponent,
  GameComponent,
  PrivateChatComponent
];

@NgModule({
  declarations: [
    ...widgets,
    ...pages,
  ],
  imports: [
    ...modules,
  ],
  providers: [
    ...services,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
