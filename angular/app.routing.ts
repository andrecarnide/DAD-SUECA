import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { Top10Component } from './pages/top10/top10.component';
import { GlobalChatComponent } from './pages/globalchat/globalchat.component';
import { LobbyComponent } from "./pages/lobby/lobby.component";
import { PageNotFoundComponent } from "./pages/pagenotfound/pagenotfound.component";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GameComponent } from "./pages/game/game.component";

import { GuardService } from "./services/guard.service";

const routes: Routes = [
    // Root
    { path: '', component: HomeComponent},
    { path: 'history', component: HistoryComponent},
    { path: 'top10', component: Top10Component},
    { path: 'globalchat', component: GlobalChatComponent, canActivate: [ GuardService ]},
    { path: 'game/:id', component: GameComponent, canActivate: [ GuardService ] },
    { path: 'lobby', component: LobbyComponent, canActivate: [ GuardService ]},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
